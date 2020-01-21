import getCookie from "./cookie";
const axios = require("axios").default;

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
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/")
      .then((response: { data: JSON }) => response.data);
  }

  getEventsUnarchived() {    
    return axios
      .get(process.env.REACT_APP_API_URL + "/eventUnarchived/")
      .then((response: { data: JSON }) => response.data);
  }

  getEvent(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/" + id)
      .then((response: { data: JSON }) => response.data);
  }

  getEventCarousel() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/eventcarousel")
      .then((response: { data: JSON }) => response.data);
  }

  getEventsByUser() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/user/all", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => response.data);
  }

  getContractsByEvent(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event/contract/" + id, {
        headers: { token: getCookie("token") }
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
        headers: { token: getCookie("token") }
      })
      .then((response: { data: FullEvent }) => response.data);
  }

  updateEvent(event: object, id: number) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event/" + id, event, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => response.data);
  }

  updateArchive() {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event_archive")
      .then((response: { data: JSON }) => response.data);
  }

  updateArchiveOne(id: number) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/event_archive" + id, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: JSON }) => response.data);
  }

  deleteEvent(id: number) {
    return axios
      .delete(process.env.REACT_APP_API_URL + "/event/" + id)
      .then((response: { data: JSON }) => response.data);
  }

  getEventVolunteer(event_id: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL + "/event/" + event_id + "/volunteers/"
      )
      .then((response: { data: JSON }) => response.data);
  }

  getEventVolunteerAdmin(event_id: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/event/" +
          event_id +
          "/volunteers/admin/",
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => response.data);
  }
  getEventIsVolunteer(event_id: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/event/" +
          event_id +
          "/volunteers/signed/",
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => {
        console.log(response.data);
        return response.data ? true : false;
      });
  }
  postEventVolunteer(event_id: number) {
    return axios
      .post(
        process.env.REACT_APP_API_URL + "/event/" + event_id + "/volunteers/",
        {},
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => {
        return response.data;
      });
  }
  deleteEventVolunteer(event_id: number) {
    return axios
      .delete(
        process.env.REACT_APP_API_URL + "/event/" + event_id + "/volunteers/",
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => {
        return response.data;
      });
  }

  deleteEventTickets(event_id: number) {
    return axios
      .delete(
        process.env.REACT_APP_API_URL + "/event/" + event_id + "/tickets/",
        { headers: { token: getCookie("token") } }
      )
      .then((response: { data: JSON }) => {
        return response.data;
      });
  }
}

export default new EventService();
