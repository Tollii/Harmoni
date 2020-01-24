import getCookie from "./cookie";
const axios = require("axios").default;

let url = process.env.REACT_APP_API_URL;

import {Contract} from "./interface"



class ContractService {
  getContracts() {
    return axios
      .get(url + "/contract", {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Contract[] }) => response.data);
  }

  getContract(userID: number, eventID: number) {
    return axios
      .get(url + "/contract/user/" + userID + "/event/" + eventID, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Contract }) => {
        return response.data;
      });
  }

  getContractsByEvent(eventID: number) {
    return axios
      .get(url + "/contract/event/" + eventID, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Contract[] }) => response.data);
  }

  postContract(contract: object) {
    return axios
      .post(url + "/contract", contract, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Contract }) => response.data);
  }

  deleteContract(userID: number, eventID: number) {
    return axios
      .delete(url + "/contract/user/" + userID + "/event/" + eventID, {
        headers: { token: getCookie("token") }
      })
      .then((response: { data: Contract }) => response.data);
  }
}

export default new ContractService();
