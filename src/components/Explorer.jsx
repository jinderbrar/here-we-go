import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  explorer: {
    minWidth: "400px",
    minHeight: "200px",
    margin: "5px",
    overflowX: "hidden",
    overflowY: "auto",
    color: "black",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  underProgressText: {
    fontSize: "large",
    color: "white",
    padding: "10px",
    background: "crimson",
    borderRadius: "10px",
  },
}));

function Explorer() {
  const classes = useStyle();
  return (
    <>
      <Grid item className={classes.explorer}>
        <span className={classes.underProgressText}>Under Development</span>
      </Grid>
    </>
  );
}

export default Explorer;
