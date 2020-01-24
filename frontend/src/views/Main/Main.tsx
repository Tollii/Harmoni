import React, { useState, useEffect } from "react";
import {makeStyles} from "@material-ui/core";
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
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "20%",
    top: "80%",
    left: "0",
  }
});

export default function Main(){
  const classes = useStyles();
  const [center, setCenter] = useState({ lat: 63.4189, lng: 10.4027 });
  const [events, setEvents] = useState<any>([]);
  const [eventsCard, setEventsCard] = useState<any>([]);

  useEffect(() => {
    EventService.getEvents().then((response: any) => {
      setEvents(response);
    });

    EventService.getEventCarousel().then((response: any) => {
      setEventsCard(response);
      setCenter(response[1]);
    });
  }, []);

  return (
    <div className={classes.container}>
      <Map events={events} center={center} zoom={11} />
      <div className={classes.carousel}>
        <Carousel events={eventsCard} setCenter={setCenter} />
      </div>

    </div>
  );
};
