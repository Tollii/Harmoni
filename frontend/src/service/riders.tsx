const axios = require("axios").default;

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
  getRider(rider_type_id: number, event_id: number, token: string) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/rider/rider_type/" +
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
      .post(process.env.REACT_APP_API_URL + "/rider/", rider)
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
        process.env.REACT_APP_API_URL +
          "/rider/rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/" +
          token,
        rider
      )
      .then((response: { data: JSON }) => console.log(response));
  }

  deleteRider(rider_type_id: number, event_id: number, token: string) {
    axios
      .delete(
        process.env.REACT_APP_API_URL +
          "/rider/rider_type/" +
          rider_type_id +
          "/event/" +
          event_id +
          "/user/" +
          token
      )
      .then((response: { data: JSON }) => console.log(response));
  }
}

export default new RiderService();
