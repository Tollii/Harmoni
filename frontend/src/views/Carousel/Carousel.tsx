import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventCard from "../../components/EventCard/EventCard";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";
import EventService from "../../service/events";

const useStyles = makeStyles({
  margin: {
    margin: "12px",
    marginBottom: "12px"
  }
});

export default (props: any) => {
  const classes = useStyles();
  let events: any = [];
  const event = "hei";

  EventService.getEvents().then((response: any) => {
    console.log(response);
    events = response;
  });

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
      autoPlay={true}
      autoPlaySpeed={2500}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div className={classes.margin}>
        <EventCard event_name={event} />
      </div>
      <div className={classes.margin}>
        {events.map((e: any) => console.log(e.event_name))}
      </div>
      <div className={classes.margin}>
        <EventCard />
      </div>
    </Carousel>
  );
};
