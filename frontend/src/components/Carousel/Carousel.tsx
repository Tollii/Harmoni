import React, { useState, useEffect } from "react";
import MatCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventCard from "../../components/EventCard/EventCard";
import { Event } from "../../service/interface";

interface Carousel {
  events: any;
  setCenter: any;
}

/**
 * Creates a carousel
 * @param events sends in a list over events to be displayed i carousel
 * @param setCenter sends in a handler for setting center object of carousel
 * @returns returns a carousel with events
 */
export default function Carousel(props: Carousel) {
  const [itemID, setItemID] = useState(1);
  const [oldID, setOldID] = useState(6);

  useEffect(() => {
    setItemID(1);
  }, []);

  useEffect(() => {
    props.setCenter(props.events[itemID]);
  }, [itemID, props]);

  var mod = function(n: any, m: any) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
  };

  const next = (index: any) => {
    let x = mod(itemID + 1, props.events.length);
    setItemID(x);
    setOldID(index);
  };
  const prev = (index: any) => {
    let x = mod(itemID - 1, props.events.length);
    setItemID(x);
    setOldID(index);
  };
  const responsive = {
    superLargeDesktop: {
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
    <MatCarousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={2500}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      centerMode={true}
      afterChange={(e: any, i: any) => {
        let index = i.currentSlide;
        if (oldID === undefined) {
          if (index === 7) {
            next(index);
          } else if (index === 5) {
            prev(index);
          }
        } else {
          if (index === oldID - 1) {
            prev(index);
          } else if (index === oldID + 1) {
            next(index);
          } else if (index > oldID) {
            prev(index);
          } else if (index < oldID) {
            next(index);
          }
        }
      }}
    >
      {props.events.map((e: Event) => (
        <EventCard key={e.id} event={e} />
      ))}
    </MatCarousel>
  );
}
