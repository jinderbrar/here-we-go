import React from "react";
import Draggable from "react-draggable";

import {
  AppBar,
  Badge,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  viewPoint: {
    perspective: "100px",
  },
  draggableContainer: {
    // transform: "rotateX(45deg)",
    position: "absolute",
    minWidth: "450px",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "5px",
  },
  draggableContent: {
    maxHeight: "500px",
    overflow: "auto",
  },
  draggableHeader: {
    minHeight: "25px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    backgroundColor: theme.palette.shadesOfGrey.light,
  },
  titleHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "80%",
    cursor: "default",
  },
  iconHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  iconDot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: theme.palette.shadesOfBlue.dark,
      cursor: "default",
    },
  },
}));

function RoundButton(
  { radius, color, m, events, text } = {
    radius: 15,
    color: "red",
    m: 2,
    text: "-",
  }
) {
  const classes = useStyle();
  const theme = useTheme();
  const [shade, hue] = color;
  return (
    <div
      {...events}
      className={classes.iconDot}
      style={{
        backgroundColor: theme.palette[shade][hue],
        color: theme.palette[shade][hue],
        borderRadius: radius,
        height: radius,
        width: radius,
        margin: `0 ${m}px`,
      }}
    >
      <b className={classes.iconDot}>{text}</b>
    </div>
  );
}

function Experiment({ appInfo, appComponent, onAppClose, onAppHide }) {
  const classes = useStyle();
  const dragHandel = `dragHandel${appInfo.title || "_"}`;
  const dragHandelId = `#${dragHandel}`;
  return (
    <Draggable
      bounds="parent"
      handle={dragHandelId}
      defaultPosition={appInfo.defaultPosition}
    >
      <Grid
        className={classes.draggableContainer}
        component={Paper}
        variant="elevation"
        style={{ visibility: appInfo.isHidden ? "hidden" : "" }}
      >
        <Grid item component={Paper} elevation={3} id={dragHandel}>
          <Toolbar disableGutters className={classes.draggableHeader}>
            <Grid item className={classes.iconHolder}>
              <RoundButton
                events={{
                  onClick: (e) => onAppClose(appInfo.id),
                }}
                color={["shadesOfRed", "light"]}
                radius={15}
                m={5}
                text={"x"}
              />
              <RoundButton
                events={{
                  onClick: (e) => onAppHide(appInfo.id),
                }}
                color={["shadesOfYellow", "light"]}
                radius={15}
                m={5}
                text={"-"}
              />
              {/* <RoundButton
                color={["shadesOfGreen", "light"]}
                radius={15}
                m={5}
              /> */}
            </Grid>
            <Grid item className={classes.titleHolder}>
              <Typography variant="overline" elevation={2}>
                {appInfo.title}
              </Typography>
            </Grid>
          </Toolbar>
        </Grid>
        <Grid item className={classes.draggableContent}>
          {appComponent}
        </Grid>
      </Grid>
    </Draggable>
  );
}

const mapState = (state) => {
  console.log(state);
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    onAppClose: (appid) => {
      console.log("dispatching for " + appid);
      dispatch({
        type: "CLOSE_APP",
        appid,
      });
    },
    onAppHide: (appid) => {
      console.log("dispatching for " + appid);
      dispatch({
        type: "HIDE_APP",
        appid,
      });
    },
  };
};
export default connect(mapState, mapDispatch)(Experiment);
