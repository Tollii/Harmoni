import Card from "@material-ui/core/Card";
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

export default (props: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={10} style={props.style}>
      {props.children}
    </Card>
  );
};
