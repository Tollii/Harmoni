import getCookie from "./cookie";
const axios = require("axios").default;

let url = "http://localhost:8080";
const token = getCookie("token");

export class Contract {
  contract!: string;
  userID!: string;
  eventID!: number;
}

class ContractService {
  getContracts() {
    return axios
      .get(url + "/contract", { headers: { token: token } })
      .then((response: { data: Contract[] }) => response.data);
  }

  getContract(userID: number, eventID: number) {
    return axios
      .get(url + "/contract/user" + userID + "/event/" + eventID)
      .then((response: { data: Contract }) => response.data);
  }

  postContract(token: string, contract: object) {
    return axios
      .post(url + "/contract", contract, { headers: { token: token } })
      .then((response: { data: Contract }) => console.log(response));
  }

  deleteContract(userID: number, eventID: number) {
    return axios
      .delete(url + "/contract/user" + userID + "/event/" + eventID)
      .then((response: { data: Contract }) => console.log(response));
  }
}

export default new ContractService();
