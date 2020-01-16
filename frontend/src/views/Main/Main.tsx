import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Map from "../../components/Map/simpleMap";
import Carousel from "../../components/Carousel/Carousel";

const useStyles = makeStyles({
  container: {
    position: "relative"
  },
  item: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: "",
    left: "0",
    zIndex: 10
  }
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Map />
      <div className={classes.item}></div>
    </div>
  );
};
