import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Carousel from "../Carousel/Carousel";

const SimpleMap = (props: any) => {
  const [name, setName] = useState();
  const [center, setCenter] = useState({ lat: 63.4189, lng: 10.4027 });
  const [zoom, setZoom] = useState(11);

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
    <div
      style={{
        height: "90vh",
        width: "100%",
        position: "relative"
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBpqnFSmQNK7VBnEm521CwPGs8zBkB-SQY" }}
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        options={{
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#f5f5f5"
                }
              ]
            },
            {
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#f5f5f5"
                }
              ]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#bdbdbd"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#eeeeee"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "poi.business",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e5e5e5"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#ffffff"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dadada"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              featureType: "road.local",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            },
            {
              featureType: "transit",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e5e5e5"
                }
              ]
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [
                {
                  color: "#eeeeee"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#c9c9c9"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#b5b5ff"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "on"
                }
              ]
            }
          ]
        }}
      >
        <Marker
          lat={center.lat}
          lng={center.lng}
          name={name}
          img={require("../../assets/img/harmoni_logo_small.png")}
        />

      </GoogleMapReact>
      <div
        style={{
          zIndex: 20,
          position: "absolute",
          width: "100%",
          height: "50%",
          top: "80%",
          left: "0"
        }}
      >
        <Carousel printMap={printMap} />
      </div>
    </div>
  );
};

export default SimpleMap;
