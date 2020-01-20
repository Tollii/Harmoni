import getCookie from "./cookie";
import UserService from "./users";
const axios = require("axios").default;
let url: string = "http://localhost:8080";

const token = getCookie("token");

export class Password {
  old_password!: string;
  new_password!: string;
}

class Authentication {
  changePassword(password: any) {
    return axios
      .put(url + "/reset/", password, { headers: { token: token } })
      .then((response: { data: Password }) => response.data);
  }

  changePasswordForgot(password: any) {
    return axios
        .put(url + "/reset/forgot", password, { headers: { token: password.token } })
        .then((response: { data: Password }) => response.data);
  }

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
