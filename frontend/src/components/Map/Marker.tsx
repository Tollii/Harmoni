import React from "react";
import "./Marker.css";

export default function Marker(props:any) {
  return (
    <div onClick={() => (window.location.hash = props.link)}>
      <img
        src={props.img}
        className="marker"
        style={{ cursor: "pointer" }}
        title={props.name}
        alt="Map pin"
      />
      <div className="pin" style={{ cursor: "pointer" }}></div>
    </div>
  );
};

