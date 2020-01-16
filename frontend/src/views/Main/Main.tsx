import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Map from "../../components/Map/simpleMap";
import Carousel from "../../components/Carousel/Carousel";



const useStyles = makeStyles({

});

export default () => {
  const classes = useStyles();
  const [name, setName] = useState();
  const [center, setCenter] = useState({ lat: 63.4189, lng: 10.4027 });
  const googleMapsClient = require("@google/maps").createClient({
    key: "AIzaSyBpqnFSmQNK7VBnEm521CwPGs8zBkB-SQY",
    Promise: Promise
  });

  const printMap = (place: any) => {
    if (place !== undefined) {
      setName(place.event_name);
      googleMapsClient
      .geocode({ address: place.location })
      .asPromise()
      .then((response: any) => {
        setCenter(response.json.results[0].geometry.location);
      })
      .catch((err: any) => {
        console.log(err);
      });
    }
  };
  return (
    <div >
        <Map center={center} name={name} style={{width:"100%", height:"100%"}}/>
        <Carousel printMap={printMap} />
    </div>
  );
};
