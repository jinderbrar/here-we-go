import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Badge, Grid, withStyles } from "@material-ui/core";

import { HIDE_APP, SHOW_APP, OPEN_APP } from "../commons/app";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  taskbarMain: {
    position: "absolute",
    width: "100%",
    bottom: "1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: "0",
  },

  taskbarTray: {
    minWidth: "calc(15% + 30px)",
    minHeight: "60px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "30px",
    paddingLeft: "15px",
    paddingRight: "15px",

    // borderBottom: '2px solid rgba(255,255,255,0.2)',
    // borderBottomLeftRadius: '10%',
    // borderBottomRightRadius: '10%',
    // background: 'linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0))'
  },

  trayIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50px",
    height: "50px",
    margin: "7px",
    padding: "3px",
    cursor: "pointer",
    borderRadius: "10%",
    transition: "transform 250ms ease-out",
    shapeOutside: "circle()",

    "&>img": {
      width: "100%",
      height: "100%",
    },

    "&:hover": {
      transform: "translateY(-25%) scale(1.5)",
      backgroundColor: "rgba(255,255,255,0.1)",

      "&>img": {
        zIndex: "2",
      },
    },
  },

  trayIconActive: {
    "&::after": {
      minWidth: "50%",
      maxHeight: "5px",
      margin: "5%",
      backgroundColor: "rgba(255,255,255,0.3)",
      content: ".",
      display: "block",
    },
  },
}));

function Taskbar({ taskbar, toggleApp }) {
  const classes = useStyle();

  const _handleToggleApp = (appInfo) => {
    let type = OPEN_APP;
    if (!appInfo.isOpen) {
      type = OPEN_APP;
    } else if (appInfo.isHidden) {
      type = SHOW_APP;
    } else {
      type = HIDE_APP;
    }
    const appid = appInfo.id;
    // dispatch function
    toggleApp(type, appid);
  };

  return (
    <Grid className={classes.taskbarMain}>
      <Grid
        item
        className={classes.taskbarTray}
        style={{
          shapeOutside: "eclipse(50px,50px)",
        }}
      >
        {Object.values(taskbar).map((app) => (
          <Grid
            item
            className={classes.trayIcon}
            onClick={(e) => _handleToggleApp(app)}
            style={app.isOpen ? { borderBottom: "2px solid #c56183" } : {}}
          >
            <img src={app.iconSrc} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => ({
  toggleApp: (type, appid) => dispatch({ type, appid }),
});

export default connect(mapState, mapDispatch)(Taskbar);
