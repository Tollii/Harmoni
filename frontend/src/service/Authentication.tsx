import getCookie from "./cookie";
import UserService from "./users";
const axios = require("axios");
let url: string = "localhost:";
let port: number = 8080;

const token = getCookie("token");

class Authentication {
  getLogin(credentials: any) {
    return axios
      .put("http://" + url + port + "/login/", credentials)
      .then((response: { data: Object }) => response.data);
  };
  signUp(information: any) {
    return axios
      .post("http://" + url + port + "/signup/", information)
      .then((response: { data: Object }) => response.data);
  };
  getAuth () {
    if(token){
      return UserService.getOneUser()
      .then(user => user.roleID)
    } else {
      return Promise.resolve(0);
    }
  }
}




export default new Authentication();
