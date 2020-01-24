import getCookie from "./cookie";
import { Riders } from "./interface";
const axios = require("axios").default;

class RiderService {
  getRiders() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider/")
      .then((response: { data: Riders[] }) => response.data);
  }

  getEventRiders(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider/event/" + id, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Riders[] }) => response.data);
  }

  getRidersForArtist(event_id: number, user_id: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/rider/event/" +
          event_id +
          "/user/" +
          user_id,
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: Riders[] }) => response.data);
  }

  postRider(rider: Riders) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/rider/", rider, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => response.data);
  }

  updateRider(rider_type_id: number, event_id: number, rider: Riders) {
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
      .then((response: { data: JSON }) => response.data);
  }

  deleteRidersForArtist(event_id: number, user_id: number) {
    return axios
      .delete(
        process.env.REACT_APP_API_URL +
          "/rider/event/" +
          event_id +
          "/user/" +
          user_id,
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => response.data);
  }
}

export default new RiderService();
