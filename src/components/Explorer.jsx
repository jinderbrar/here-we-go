import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  explorer: {
    minHeight: "400px",
    maxHeight: "400px",
  },
}));

function Explorer() {
  const classes = useStyle();

  return (
    <Grid item className={classes.explorer}>
      this is exp
    </Grid>
  );
}

export default Explorer;
