import React from "react";
import { Link } from "react-router-dom";
import Map from "../Map/simpleMap";
import Carousel from "../Carousel/Carousel";
import { makeStyles } from "@material-ui/core";
//import EventCard from "../../components/EventCard/EventCard";

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
  item: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: "",
    left: "0",
    zIndex: 10,
  }
});

  export default () => {
    const classes = useStyles();
    return (
    <div className={classes.container}>
      <Map />
      <div className={classes.item}>
      </div>
    </div>
  );
};

