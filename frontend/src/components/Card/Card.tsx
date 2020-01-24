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
 * Creates a card
 * @param children, sends in the children
 * @param style sends in styling of the card
 * @returns returns a card
 */
export default function Card(props: any){
  const classes = useStyles();

  return (
    <MatCard className={classes.card} elevation={10} style={props.style}>
      {props.children}
    </MatCard>
  );
};
