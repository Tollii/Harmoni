const axios = require('axios').default;

let url = "http://localhost:8080";

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
    return axios.get(url + '/ticket').then((response: {data: JSON}) => response.data);
  }

  getTicket(id: number) {
    return axios.get(url + '/ticket/' + id).then((response: {data: JSON}) => response.data);
  }

  postTicket(ticket: object) {
    return axios.post(url + '/ticket', ticket)
    .then((response: {data: JSON}) => console.log(response));
  }

  updateTicket(ticket: object, id: number) {
    return axios.put(url + '/ticket/' + id, ticket)
    .then((response: {data: JSON}) => console.log(response));
  }

  deleteTicket(id: number) {
    return axios.delete(url + '/ticket/' + id).then((response: {data: JSON}) => console.log(response));
  }
}

export let ticketService = new TicketService();
