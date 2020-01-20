import getCookie from "./cookie";
const axios = require("axios").default;

export class Role {
  id!: number;
  role_name!: string;
}
const token = getCookie("token");
class RoleService {
  getRoles() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/role", {
        headers: { token: token }
      })
      .then((response: { data: Role[] }) => response.data);
  }

  getRole(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/role/" + id, {
        headers: { token: token }
      })
      .then((response: { data: Role }) => response.data);
  }
}

export default new RoleService();
