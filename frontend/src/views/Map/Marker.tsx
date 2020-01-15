import React from "react";
import "./Marker.css";

const Marker = (props: any) => {
  const { img, name, id } = props;
  return (
    <img 
      src = {img}
      className="marker"
      style={{cursor: "pointer" }}
      title={name}
    />
  );
};

export default Marker;
