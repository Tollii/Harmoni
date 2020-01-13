const axios = require('axios').default;

let url = "http://localhost:8080"

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

class EventService {
  getEvents() {
    return axios.get(url + '/event').then((response: {data: JSON}) => response.data);
  }

  getEvent(id: number) {
    return axios.get(url + '/event/' + id).then((response: {data: JSON}) => response.data);
  }

  postEvent(event: object) {
    return axios.post(url + '/event', event)
    .then((response: {data: JSON}) => console.log(response));
  }

  updateEvent(event: object, id: number) {
    return axios.put(url + '/event/' + id, event)
    .then((response: {data: JSON}) => console.log(response));
  }

  deleteEvent(id: number) {
    return axios.delete(url + '/event/' + id).then((response: {data: JSON}) => console.log(response));
  }
}

export let eventService = new EventService();
