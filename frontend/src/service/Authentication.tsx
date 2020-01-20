import getCookie from "./cookie";
import UserService from "./users";
const axios = require("axios");

const token = getCookie("token");

class Authentication {
  getLogin(credentials: any) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/login/", credentials)
      .then((response: { data: Object }) => response.data);
  }
  signUp(information: any) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/signup/", information)
      .then((response: { data: Object }) => response.data);
  }
  getAuth() {
    if (token) {
      return UserService.getOneUser().then((user: any) => user.roleID);
    } else {
      return Promise.resolve(0);
    }
  }
}

export default new Authentication();
