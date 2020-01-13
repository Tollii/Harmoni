const axios = require("axios");
let url: string = "localhost:";
let port: number = 8080;

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
}



export default new Authentication();
