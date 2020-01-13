import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/signUp">Sign up </Link>
      <Link to="/addEvent">AddEvent </Link>
    </div>
  );
};
