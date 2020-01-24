import getCookie from "./cookie";
import { Rider_Type } from "./interface";
const axios = require("axios").default;

class Rider_TypeService {
  getRider_Types() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider_type/", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Rider_Type[] }) => response.data);
  }

  getRider_Type(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/rider_type/" + id)
      .then((response: { data: Rider_Type }) => response.data);
  }
}

export default new Rider_TypeService();
