import getCookie from "./cookie";
const axios = require("axios").default;

let url = process.env.REACT_APP_API_URL;

class MailingService {
  cancelEventMail(eventID: number) {
    return axios
      .post(url + "/mailer/event/" + eventID, "", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: any }) => console.log(response));
  }

  forgotMail(email: string) {
    return axios
      .get(url + "/mailer/password", {
        headers: { email: email, path: process.env.REACT_APP_API_URL }
      })
      .then((response: { data: any }) => console.log(response));
  }

    sendFeedback(userFeedback: object) {
        return axios
            .post(url + "/mailer/feedback", userFeedback, {
                headers: { token: getCookie("token") }
            })
            .then((response: { data: any }) => console.log(response));
    }
}

export default new MailingService();
