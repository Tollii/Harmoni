import getCookie from "./cookie";
const axios = require("axios").default;

const token = getCookie("token");

export class Event {
  id!: number;
  event_name!: string;
  location!: string;
  event_start!: string;
  event_end!: string;
  personnel!: string;
  description!: string;
  archived!: boolean;
  event_typeID!: number;
}

class FullEvent {
  event_name!: string;
  location!: string;
  event_start!: string;
  event_end!: string;
  personnel!: string;
  description!: string;
  event_typeID!: number;
  artists!: number[];
  riders!: Array<{ additions: string; rider_typeID: number; userID: number }>;
  tickets!: Array<{
    ticket_name: string;
    price: number;
    ticket_amount: number;
    date_start: string;
    date_end: string;
  }>;
}

class EventService {
  getEvents() {
    console.log(process.env.REACT_APP_API_URL);
    return axios
      .get(process.env.REACT_APP_API_URL + "/event")
      .then((response: { data: JSON }) => response.data);
  }

  getEvent(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/" + id)
      .then((response: { data: JSON }) => response.data);
  }

  getEventsByUser() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/user/all", {
        headers: { token: token }
      })
      .then((response: { data: JSON }) => response.data);
  }

  getArtists(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/" + id)
      .then((response: { data: JSON }) => response.data);
  }

  postEvent(event: object) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/event/", event, {
        headers: { token: token }
      })
      .then((response: { data: FullEvent }) => response.data);
  }

  updateEvent(event: object, id: number) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event/" + id, event)
      .then((response: { data: JSON }) => console.log(response));
  }

  updateArchive() {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event_archive")
      .then((response: { data: JSON }) => console.log(response));
  }

  updateArchiveOne(id: number) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event_archive" + id, {
        headers: { token: token }
      })
      .then((response: { data: JSON }) => console.log(response));
  }

  deleteEvent(id: number) {
    return axios
      .delete(process.env.REACT_APP_API_URL + "/event/" + id)
      .then((response: { data: JSON }) => console.log(response));
  }
}

export default new EventService();
