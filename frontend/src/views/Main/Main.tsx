import React from "react";
import { Link } from "react-router-dom";
import Map from "../Map/simpleMap";

export default () => {
  return (
    <div>
      <Link to="/signUp">Sign up </Link>
      <Link to="/addEvent">AddEvent </Link>
      <Map/>
    </div>
  );
};
