import getCookie from "./cookie";
const axios = require("axios").default;

const token = getCookie("token");
export class Riders {
  additions!: string;
  rider_typeID!: number;
  eventID!: number;
  token!: string;
}

class RiderService {
  getRiders() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider/")
      .then((response: { data: JSON }) => response.data);
  }

  getEventRiders(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider/event/" + id, {
        headers: { token:  getCookie("token")}
      })
      .then((response: { data: JSON }) => response.data);
  }

  getRidersForArtist(event_id: number, user_id: number) {
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            "/rider/event/" +
            event_id +
            "/user/" +
            user_id ,
            { headers: { token: getCookie("token")} }
        )
        .then((response: { data: JSON }) => response.data);
  }

  getRider(rider_type_id: number, event_id: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/rider/rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/", {headers: {token: getCookie("token")}}      )
      .then((response: { data: JSON }) => response.data);
  }

  postRider(rider: object) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/rider/", rider, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => console.log(response));
  }

  updateRider(rider_type_id: number, event_id: number, rider: object) {
    return axios
      .put(
        process.env.REACT_APP_API_URL +
          "/rider/rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/",
        rider,
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => response);
  }

  deleteRider(event_id: number) {
    return axios
      .delete(process.env.REACT_APP_API_URL + "/rider/event/" + event_id, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => console.log(response));
  }

  deleteRidersForArtist(event_id: number, user_id: number) {
    axios
        .delete(
            process.env.REACT_APP_API_URL +
            "/rider/event/" +
            event_id +
            "/user/" +
            user_id,
            { headers: { token: getCookie("token") } }
        )
        .then((response: { data: JSON }) => console.log(response));
  }
}

export default new RiderService();
