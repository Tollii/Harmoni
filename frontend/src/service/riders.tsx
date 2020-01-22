import getCookie from "./cookie";

const axios = require("axios").default;

let url = "http://localhost:8080/rider/";
let token = getCookie("token");

export class Riders {
  additions!: string;
  rider_typeID!: number;
  eventID!: number;
  token!: string;
}

class RiderService {
  getRiders() {
    return axios.get(url).then((response: { data: JSON }) => response.data);
  }

  getRidersForArtist(event_id: number, user_id: number) {
    console.log(event_id + " " + user_id);
    return axios
        .get(
            url +
            "event/" +
            event_id +
            "/user/" +
            user_id ,
            { headers: { token: token } }
        )
        .then((response: { data: JSON }) => response.data);
  }

  getRider(rider_type_id: number, event_id: number, token: string) {
    return axios
      .get(
        url +
          "rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/" +
          token
      )
      .then((response: { data: JSON }) => response.data);
  }

  postRider(rider: object) {
    return axios
      .post(url, rider)
      .then((response: { data: JSON }) => console.log(response));
  }

  updateRider(
    rider_type_id: number,
    event_id: number,
    token: string,
    rider: object
  ) {
    return axios
      .put(
        url +
          "rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/" +
          token,
        rider
      )
      .then((response: { data: JSON }) => response);
  }

  deleteRider(rider_type_id: number, event_id: number, token: string) {
    axios
      .delete(
        url +
          "rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/" +
          token
      )
      .then((response: { data: JSON }) => console.log(response));
  }

  deleteRidersForArtist(event_id: number, user_id: number) {
    axios
        .delete(
            url +
            "event/" +
            event_id +
            "/user/" +
            user_id,
            { headers: { token: token } }
        )
        .then((response: { data: JSON }) => console.log(response));
  }
}

export default new RiderService();
