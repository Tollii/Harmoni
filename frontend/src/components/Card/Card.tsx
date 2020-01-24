import MatCard from "@material-ui/core/Card";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    borderRadius: 0,
    minWidth: 200,
    minHeight: 100,
    maxWidth: 1000,
    marginRight: "auto",
    marginLeft: "auto"
  }
});

/**
 * Opens an alert dialog
 * @param eventID sends in the id of the current event
 * @param open sends in boolean to check whether the AlertDialog should be open or not
 * @param handleAlert sends in handler for closing the dialog
 * @returns returns an alert dialog window
 */
export default function Card({children, style}: any){
  const classes = useStyles();

  return (
    <MatCard className={classes.card} elevation={10} style={style}>
      {children}
    </MatCard>
  );
};
