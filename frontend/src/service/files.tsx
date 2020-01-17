import getCookie from "./cookie";

const axios = require("axios");
let url: string = "http://localhost:8080";
const token = getCookie("token");

class files {
  postProfilePicture(data: any, token: String) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/event/" + token, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }

  postContracts() {
    //todo:Sprint 2
  }

  postEventPicture(data: any, id: number) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/event/" + id, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }
}

export default new files();
