import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    EventService.getEvents().then((response: any) => {
      setEvents(response);
      setCenter(response[1])
    });
  }, []);

  return (
      <div className={classes.container}>
          <Map events={events} center={center} zoom={11}/>
          <div className={classes.carousel}>
            <Carousel events={events} setCenter={setCenter} />
          </div>
      </div>
  );
};
