import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Map from "../../components/Map/simpleMap";
import Carousel from "../../components/Carousel/Carousel";
import EventService from "../../service/events";

const useStyles = makeStyles({
  container: {
    height: "90vh",
    width: "100%",
    position: "relative"
  },
  carousel: {
    zIndex: 20,
    position: "absolute",
    width: "100%",
    height: "50%",
    top: "80%",
    left: "0"
  }

});

export default () => {
  const classes = useStyles();
  const [center, setCenter] = useState({ lat: 63.4189, lng: 10.4027 });
  const [events, setEvents] = useState<any>([]);
  const googleMapsClient = require("@google/maps").createClient({
    key: "AIzaSyBpqnFSmQNK7VBnEm521CwPGs8zBkB-SQY",
    Promise: Promise
  });

  const printMap = (place: any) => {
    if (place !== undefined) {
      googleMapsClient
      .geocode({ address: place.location })
      .asPromise()
      .then((response: any) => {
        setCenter(response.json.results[0].geometry.location);
      })
      .catch((err: any) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    EventService.getEvents().then((response: any) => {
      setEvents(response);
      printMap(response[1])
    });
  }, []);

  return (
      <div className={classes.container}>
          <Map events={events} center={center}/>
          <div className={classes.carousel}>
            <Carousel events={events} printMap={printMap} />
          </div>
      </div>
  );
};
