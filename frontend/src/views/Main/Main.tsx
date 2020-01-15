import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
//import EventCard from "../../components/EventCard/EventCard";

export default () => {
  return (
    <div>
      <Link to="/signUp">Sign up </Link>
      <Link to="/addEvent">AddEvent </Link>
      <Carousel/>
    </div>
    
  );
};
