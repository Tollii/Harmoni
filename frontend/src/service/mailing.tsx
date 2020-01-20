import getCookie from "./cookie";
const axios = require("axios").default;

let url = "http://localhost:8080";


class MailingService {
    cancelEventMail(token: string, eventID: number) {
        return axios
            .post(url + "/mailer/event/" + eventID + "/", { headers: { token: token } })
            .then((response: { data: any }) => console.log(response));
    }
}

export default new MailingService();
