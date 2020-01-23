import React from "react";
import "./Marker.css";

const Marker = (props: any) => {
  const { img, name, link } = props;
  return (
    <div onClick={() => (window.location.hash = link)}>
      <img
        src={img}
        className="marker"
        style={{ cursor: "pointer" }}
        title={name}
        alt="Map pin"
      />
      <div className="pin" style={{ cursor: "pointer" }}></div>
    </div>
  );
};

export default Marker;
