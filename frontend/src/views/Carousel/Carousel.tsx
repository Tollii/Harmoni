import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoginCard from "../Login/LoginCard";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";


const useStyles = makeStyles({
  
  margin: {
    margin: "12px"
  }
});

export default (props: any) => {
  const classes = useStyles();
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
        <LoginCard />
      </div>
      <div className={classes.margin}>
        <LoginCard />
      </div>
      <div className={classes.margin}>
        <LoginCard />
      </div>
      <div className={classes.margin}>
        <LoginCard />
      </div>
      <div className={classes.margin}> 
        <LoginCard />
      </div>
      <div className={classes.margin}>
        <LoginCard />
      </div>
      <div className={classes.margin}>
        <LoginCard />
      </div>
    </Carousel>
  );
};
