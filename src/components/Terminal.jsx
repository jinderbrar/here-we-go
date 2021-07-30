import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { defaultFS } from "../commons/fileSystem";

import { Grid, Input, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  terminalBody: {
    margin: "5px",
    overflowX: "hidden",
    overflowY: "auto",
    color: "black",
    minHeight: "200px",
    maxHeight: "100px",
  },
  terminalRowInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  terminalRowHistory: {
    paddingTop: "5px",
  },
  terminalRowHighlight: {
    width: "100%",
    padding: "5px 5px 5px 10px",
    borderRadius: "10px 0 0 10px",
    border: `1px solid ${theme.palette.shadesOfGrey.light}`,
    color: theme.palette.shadesOfPurple.light,
    fontWeight: "bold",
  },
  terminalRowError: {
    color: theme.palette.shadesOfRed.light,
  },
  dirpath: {
    color: theme.palette.shadesOfBlue.dark,
    fontWeight: "bold",
    marginRight: "10px",
  },
}));

const defaultHelpOutput =
  "following commands are available\nls : list content in current directory\ncd : cd <directoryName>\nopen : open <fileName>";

const defaultHistory = [
  {
    path: "",
    input: "Enter help for more info.",
    output: "",
    isDefault: true,
    isError: false,
  },
];

const _process_ls = (currentDir, fileSystem) => {
  let output = fileSystem[currentDir].kids
    .map((dirId) => fileSystem[dirId].name)
    .join("\t");
  return output;
};
const _process_cd = (currentDir, targetDir, fileSystem) => {
  const obj = { dirAvailable: true, output: "", dirId: currentDir };
  if (targetDir == ".") {
    return obj;
  } else if (targetDir == "..") {
    obj.dirId = fileSystem[currentDir].parentId;
    return obj;
  } else {
    const kidsDirs = fileSystem[currentDir].kids.map((dirId) =>
      fileSystem[dirId].name.toLowerCase()
    );
    const indexOfDir = kidsDirs.indexOf(targetDir.toLowerCase());
    if (indexOfDir == -1 || fileSystem[indexOfDir].type != "FOLDER") {
      obj.dirAvailable = false;
      obj.output = `no such directory '${targetDir}'`;
    } else {
      obj.dirId = fileSystem[currentDir].kids[indexOfDir];
    }
  }
  return obj;
};
const getDirPath = (currentDir, fileSystem) => {
  console.log(currentDir);
  const dirList = [fileSystem[currentDir].name];
  let parentDir = fileSystem[currentDir].parentId;
  while (currentDir != parentDir) {
    dirList.push(fileSystem[parentDir].name);
    currentDir = parentDir;
    parentDir = fileSystem[currentDir].parentId;
  }
  let path = dirList.reverse().join("/") + "/";
  return path;
};

const Terminal = ({ terminalId }) => {
  const classes = useStyle();
  const ref = useRef(null);
  const [terminalHistory, setTerminalHistory] = useState(defaultHistory);
  const [currDir, setCurrDir] = useState(0);

  const fileSystem = { ...defaultFS };

  const path = getDirPath(currDir, fileSystem);

  const _handelKeyUp = (e) => {
    if (e.keyCode == 13) {
      const value = e.target.value.split(" ");
      const input = value[0];
      const extra = value.slice(1);
      _process(path, input, extra);
      e.target.value = "";
    }
  };

  // process terminal comands
  const _process = (path, input, extra = []) => {
    let output = "";
    switch (input) {
      case "help":
        output = defaultHelpOutput;
        break;
      case "ls":
        output = _process_ls(currDir, fileSystem);
        console.log(`ls : ${output}`);
        break;
      case "cd":
        const targetDir = extra.join(" ");
        const obj = _process_cd(currDir, targetDir, fileSystem);
        output = obj.output;
        if (obj.dirId != -1) {
          setCurrDir(obj.dirId);
        }
        break;
      case "clear":
        setTerminalHistory([]);
        return;
      default:
        output = "invalid command";
        break;
    }
    const inputs = [input, ...extra].join(" ");
    const obj = { path, input: inputs, output };
    console.log(obj);
    setTerminalHistory([...terminalHistory, obj]);
  };

  const renderTerminalHistoryRow = (obj, index) => {
    const terminalRowHighlight = obj.isDefault
      ? classes.terminalRowHighlight
      : "";
    const terminalRowOutput = obj.isError ? classes.terminalRowError : "";
    const key = `terminalHistoryRow${index}`;
    console.log("writing input ", obj);
    return (
      <Grid item key={key} className={classes.terminalRowHistory}>
        <Grid item className={classes.terminalRowInput}>
          <Grid item className={classes.dirpath}>
            {obj.path}
          </Grid>
          <Grid item className={terminalRowHighlight}>
            {obj.input}
          </Grid>
        </Grid>
        <Grid item className={terminalRowOutput}>
          <pre>{obj.output}</pre>
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [terminalHistory]);

  return (
    <Grid item className={classes.terminalBody} ref={ref}>
      {terminalHistory.map(renderTerminalHistoryRow)}
      {/* input box for new input */}
      <Grid item className={classes.terminalRowInput}>
        <Grid item className={classes.dirpath}>
          {/* {getDirPath(currDir, fileSystem)} */}
          {path}
        </Grid>
        <Input
          style={{ color: "black", input: { padding: "0px" } }}
          defaultValue=""
          disableUnderline
          fullWidth
          autoFocus
          onBlur={(e) => e.currentTarget.focus()}
          onKeyUp={(e) => _handelKeyUp(e)}
        />
      </Grid>
    </Grid>
  );
};

export default Terminal;
