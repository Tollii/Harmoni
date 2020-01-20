import getCookie from "./cookie";
const axios = require("axios").default;

export class Event_Type {
  id!: number;
  event_type!: string;
}

class Event_TypeService {
  getEvent_Types() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event_types/", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Event_Type[] }) => response.data);
  }

  getEvent_Type(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/event_types" + id)
      .then((response: { data: Event_Type }) => response.data);
  }
}

export default new Event_TypeService();
