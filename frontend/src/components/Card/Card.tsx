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

export default function Card({children, style}: any){
  const classes = useStyles();

  return (
    <MatCard className={classes.card} elevation={10} style={style}>
      {children}
    </MatCard>
  );
};
