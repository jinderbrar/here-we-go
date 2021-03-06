import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Typography,
  IconButton,
  Grid,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  Tooltip,
} from "@material-ui/core";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import OutlinedFlagOutlinedIcon from "@material-ui/icons/OutlinedFlagOutlined";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyle = makeStyles((theme) => ({
  root: {
    maxHeight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  colFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  playButton: {
    color: theme.status.play,
    fontSize: "48px",
  },
  pauseButton: {
    color: theme.status.pause,
    fontSize: "48px",
  },
  flagButton: {
    color: "",
    fontSize: "48px",
  },
  restoreButton: {
    color: "",
    fontSize: "48px",
  },
  tableContainer: {
    maxHeight: "300px",
    marginBottom: "10px",
    overflowY: "auto",
  },
  table: {
    minWidth: "380px",
    maxWidth: "400px",
  },
  tableBody: {
    // maxHeight: "200px",
    alignItems: "space-around",
    overflowY: "auto",
  },
  lapCellTypo: {
    marginRight: 20,
  },
}));

const lapsDefault = {
  lapsList: [],
  lastLapTime: 0,
  fastest: {
    lapTime: Infinity,
    index: -1,
  },
  slowest: {
    lapTime: -1,
    index: -1,
  },
};

const Stopwatch = () => {
  const [time, setTime] = useState(0.0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState(lapsDefault);
  const intervalRef = useRef(0);

  const formatTime = () => {
    const sec = `${Math.floor(time) % 60}`.padStart(2, "0");
    const min = `${Math.floor(time / 60) % 60}`.padStart(2, "0");
    const hour = `${Math.floor(time / 3600)}`.padStart(2, "0");
    return (
      <>
        <Grid item className={classes.rowFlex}>
          <Typography variant="h1">{[hour, min, sec].join(":")}</Typography>
        </Grid>
        <Box className={classes.rowFlex}>
          {["hr", "min", "sec"].map((unit) => (
            <Typography key={unit} vairant="overline">
              {unit}
            </Typography>
          ))}
        </Box>
      </>
    );
  };

  const handelPlayPause = () => {
    setIsActive(!isActive);
  };
  const handelReset = () => {
    setTime(0);
    setIsActive(false);
    setLaps(lapsDefault);
  };
  const handelLaps = () => {
    const lapTime = time - laps.lastLapTime;
    const thisLap = {
      lapIndex: laps.lapsList.length,
      lapTime: lapTime,
      totalTime: time,
    };

    const newSlowest = { ...laps.slowest };
    if (thisLap.lapTime > laps.slowest.lapTime) {
      newSlowest.lapTime = thisLap.lapTime;
      newSlowest.index = laps.lapsList.length;
    }
    const newFastest = { ...laps.fastest };
    if (thisLap.lapTime < laps.fastest.lapTime) {
      newFastest.lapTime = thisLap.lapTime;
      newFastest.index = laps.lapsList.length;
    }

    const newLaps = {
      lapsList: [...laps.lapsList, thisLap],
      lastLapTime: Math.floor(time),
      slowest: newSlowest,
      fastest: newFastest,
    };

    setLaps(newLaps);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setTimeout(() => setTime(time + 0.1), 100);
      return () => clearTimeout(intervalRef.current);
    }
  }, [time, isActive]);

  const classes = useStyle();
  return (
    <>
      <Grid className={classes.root}>
        <Grid item>{formatTime()}</Grid>
        <Grid item>
          <ControlButtons
            args={{
              time,
              isActive,
              classes,
              handelPlayPause,
              handelLaps,
              handelReset,
            }}
          />
        </Grid>
        <Grid item>{laps.lapsList.length > 0 && <Laps laps={laps} />}</Grid>
      </Grid>
    </>
  );
};

const ControlButtons = ({
  args: { time, isActive, handelPlayPause, handelLaps, handelReset, classes },
}) => {
  return (
    <Grid item className={classes.rowFlex}>
      {/* play or pause stopwatch */}
      <Tooltip title={isActive ? "Pause" : "Play"}>
        <IconButton onClick={() => handelPlayPause()}>
          {
            {
              true: <PauseCircleFilledIcon className={classes.pauseButton} />,
              false: <PlayCircleFilledIcon className={classes.playButton} />,
            }[isActive]
          }
        </IconButton>
      </Tooltip>
      {/* create new laps */}
      <Tooltip title={"Lap / Splits"}>
        <IconButton disabled={!isActive} onClick={() => handelLaps()}>
          <OutlinedFlagOutlinedIcon className={classes.flagButton} />
        </IconButton>
      </Tooltip>
      {/* reset stopwatch */}
      <Tooltip title={"Reset"}>
        <IconButton disabled={time === 0} onClick={() => handelReset()}>
          <RestoreIcon className={classes.restoreButton} />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

const Laps = ({ laps }) => {
  const classes = useStyle();
  const columns = [
    { id: "lapIndex", label: "Laps" },
    { id: "lapTime", label: "Time" },
    { id: "totalTime", label: "Total" },
  ];

  const formatTime = (time) => {
    const sec = `${Math.floor(time)}`.padStart(2, "0");
    const min = `${Math.floor(time / 60) % 60}`.padStart(2, "0");
    const hour = `${Math.floor(time / 3600)}`.padStart(2, "0");
    return (
      <Typography variant="body1">{[hour, min, sec].join(" : ")}</Typography>
    );
  };
  const formattedRow = (lap, index) => {
    return (
      <TableRow hover key={index}>
        <TableCell>
          <Typography className={classes.lapCellTypo} component="span">
            {lap.lapIndex}
          </Typography>
          {laps.lapsList.length > 1 && laps.slowest.index === lap.lapIndex && (
            <Typography component="span">Slowest</Typography>
          )}
          {laps.lapsList.length > 1 && laps.fastest.index === lap.lapIndex && (
            <Typography component="span">Fastest</Typography>
          )}
        </TableCell>
        <TableCell>{formatTime(lap.lapTime)}</TableCell>
        <TableCell>{formatTime(lap.totalTime)}</TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      className={classes.tableContainer}
    >
      <Table className={classes.table} stickyHeader size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {laps.lapsList
            .slice()
            .reverse()
            .map((lap, index) => formattedRow(lap, index))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Stopwatch;
