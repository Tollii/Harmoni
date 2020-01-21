import React from "react";
import "./Marker.css";

const Marker = (props: any) => {
  const { img, name } = props;
  return (
    <div>
      <img
        src = {img}
        className="marker"
        style={{cursor: "pointer" }}
        title={name}
        alt="Map pin"
      />
      <div className="pin" style={{cursor: "pointer" }}></div>
    </div>

  );
};

export default Marker;
