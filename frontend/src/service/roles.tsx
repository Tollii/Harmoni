import getCookie from "./cookie";
import {Role} from "./interface"
const axios = require("axios").default;
class RoleService {
  getRoles() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/role", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Role[] }) => response.data);
  }

  getRole(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/role/" + id, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Role }) => response.data);
  }
}

export default new RoleService();
