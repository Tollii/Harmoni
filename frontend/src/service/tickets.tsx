import getCookie from "./cookie";
const axios = require("axios").default;

export class Ticket {
  id!: number;
  ticket_name!: string;
  price!: number;
  ticket_amount!: number;
  date_start!: string;
  date_end!: string;
  eventID!: number;
}

class TicketService {
  getTickets() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/ticket/", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Ticket[] }) => response.data);
  }

  getTicket(id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/ticket/" + id)
      .then((response: { data: Ticket }) => response.data);
  }

  getEventTickets(event_id: number) {
    return axios
      .get(process.env.REACT_APP_API_URL + "/ticket/event/" + event_id)
      .then((response: { data: Ticket[] }) => response.data);
  }

  postTicket(ticket: object) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/ticket/", ticket, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Ticket }) => response.data);
  }

  updateTicket(ticket: object, id: number) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/ticket/" + id, ticket, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Ticket }) => response.data);
  }

  deleteTicket(id: number) {
    return axios
      .delete(process.env.REACT_APP_API_URL + "/ticket/" + id)
      .then((response: { data: Ticket }) => console.log(response));
  }
}

export default new TicketService();
