import getCookie from "./cookie";

const axios = require("axios");
const token = getCookie("token");

class files {
  postProfilePicture(data: any) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(process.env.REACT_APP_API_URL + "/image/profile/", formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }

  postContracts(data: any, token: String, userID: number, eventID: number) {
    let formData = new FormData();
    formData.append("contract", data);
    return axios
      .put(
        process.env.REACT_APP_API_URL +
          "/files/contract/user/" +
          userID +
          "/event/" +
          eventID,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((response: { data: JSON }) => response.data);
  }

  postEventPicture(data: any, id: number) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(process.env.REACT_APP_API_URL + "/image/event/" + id, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }
}

export default new files();
