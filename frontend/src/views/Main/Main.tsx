import React from "react";
import { Link } from "react-router-dom";
import Map from "../Map/simpleMap";
import Carousel from "../Carousel/Carousel";
//import EventCard from "../../components/EventCard/EventCard";

export default () => {

     return (
    <div>
      <Map />
      <Link to="/signUp">Sign up </Link>
      <Link to="/addEvent">AddEvent </Link>
      <Map/>
      <Carousel/>
    </div>
    
  );
};

