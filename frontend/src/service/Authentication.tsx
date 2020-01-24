import getCookie from "./cookie";
import { Password, Login, Signup } from "./interface";
const axios = require("axios").default;
let url: string = "http://localhost:8080";

class Authentication {
  changePassword(password: Password) {
    return axios
      .put(url + "/reset/", password, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: string }) => response.data);
  }

  changePasswordForgot(password: any) {
    return axios
      .put(url + "/reset/forgot", password, {
        headers: { token: password.token }
      })
      .then((response: { data: Password }) => response.data);
  }

  getLogin(credentials: Login) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/login/", credentials)
      .then((response: { data: Object }) => response.data);
  }
  signUp(information: Signup) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/signup/", information)
      .then((response: { data: Object }) => response.data);
  }
}

export default new Authentication();
