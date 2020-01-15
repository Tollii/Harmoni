import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventCard from "../../components/EventCard/EventCard";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";
import EventService from "../../service/events";

export default (props: any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getEvents().then((response: any) => {
      setEvents(response);
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={2500}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {events.map((e: any) => (
        <EventCard event={e} />
      ))}
    </Carousel>
  );
};
