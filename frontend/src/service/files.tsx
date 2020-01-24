import getCookie from "./cookie";

const axios = require("axios");
let url = process.env.REACT_APP_API_URL;

class files {
  postProfilePicture(data: File) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/profile/", formData, {
        headers: {
          token: getCookie("token"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }

  postContracts(data: File, userID: number, eventID: number) {
    let formData = new FormData();
    formData.append("contract", data);
    return axios
      .put(
        url +
          "/files/contract/user/" +
          userID +
          "/event/" +
          eventID,
        formData,
        {
          headers: {
            token: getCookie("token"),
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((response: { data: JSON }) => response.data);
  }

  postEventPicture(data: File, id: number) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/event/" + id, formData, {
        headers: {
          token: getCookie("token"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }
}

export default new files();
