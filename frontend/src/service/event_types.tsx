import getCookie from "./cookie";
const axios = require("axios").default;

let url = "http://localhost:8080";
const token = getCookie("token");

export class Event_Type {
  id!: number;
  event_type!: string;
}

class Event_TypeService {
  getEvent_Types() {
    return axios
      .get(url + "/event_types/", { headers: { token: token } })
      .then((response: { data: Event_Type[] }) => response.data);
  }

  getEvent_Type(id: number) {
    return axios
      .get(url + "/event_types" + id)
      .then((response: { data: Event_Type }) => response.data);
  }
}

export default new Event_TypeService();
