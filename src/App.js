import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

import Taskbar from "./components/Taskbar";
import Terminal from "./components/Terminal";
import Stopwatch from "./components/Stopwatch";
import Explorer from "./components/Explorer";
import Experiment from "./components/Experiment";
import { connect } from "react-redux";

import { appType } from "./commons/app";

const useStyle = makeStyles((theme) => ({
  app: {
    top: "0px",
    left: "0px",
    position: "fixed",
    height: "100%",
    width: "100%",
    background: "url(https://i.imgur.com/I4IfRQa.png) center/cover",
  },
}));

const renderApp = (app) => {
  switch (app.id) {
    case appType.TERMINAL:
      return <Terminal />;
    case appType.STOPWATCH:
      return <Stopwatch />;
    case appType.EXPLORER:
      return <Explorer />;
    default:
      return;
  }
};

function App({ taskbar }) {
  const classes = useStyle();

  return (
    <div className={classes.app}>
      <Taskbar taskbar={taskbar} />
      {Object.values(taskbar).map((app) => {
        if (app.isOpen) {
          return (
            <Experiment
              key={app.id}
              appInfo={app}
              appComponent={renderApp(app)}
            />
          );
        }
      })}
    </div>
  );
}

const mapState = (state) => {
  return {
    taskbar: state.taskbar,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(App);
