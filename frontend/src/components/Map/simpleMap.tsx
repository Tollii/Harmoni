import React, { useState, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
//@ts-ignore
import Geocode from "react-geocode";

interface Map {
  events: any;
  center: any;
  zoom: number
}

/**
 * Creates a styled map
 * @param events list of events to be marked on map
 * @param center sets center location for map
 * @param zoom sets zoom level for map
 * @returns returns a styled map
 */
const SimpleMap = (props:Map) => {
  const [center, setCenter] = useState<{lat: number, lng: number}>({ lat: 63.4189, lng: 10.4027 });
  const [marker, setMarker] = useState([]);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  const findCenter = useCallback((place: any): any => {
    if (place !== undefined) {
      return Geocode.fromAddress(place.location).then(
        (response: any) => {
          return response.results[0].geometry.location;
        },
        (err: any) => {
          console.error(err);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Promise.all(
      props.events.map(async (e: any) => {
        return findCenter(e).then((center: any) => {
          if (center !== undefined) {
            return (
              <Marker
                key={e.id}
                lat={center.lat}
                lng={center.lng}
                name={e.event_name}
                img={require("../../assets/img/harmoni_logo_small.png")}
                link={"/event/" + e.id}
              />
            );
          }
        });
      })
    ).then((results: any) => {
      setMarker(results);
    });
  }, [props.events, findCenter]);

  useEffect(() => {
    if (props.center) {
      findCenter(props.center).then((x: any) => {
        setCenter(x);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" + process.env.REACT_APP_GOOGLE_API_KEY }}
      center={center}
      defaultZoom={props.zoom}
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
      {marker}
    </GoogleMapReact>
  );
};

export default SimpleMap;
