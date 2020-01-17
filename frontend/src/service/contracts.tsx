import getCookie from "./cookie";
const axios = require("axios").default;

const token = getCookie("token");

export class Contract {
  contract!: string;
  userID!: string;
  eventID!: number;
}

class ContractService {
  getContracts() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/contract", {
        headers: { token: token }
      })
      .then((response: { data: Contract[] }) => response.data);
  }

  getContract(userID: number, eventID: number) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/contract/user" +
          userID +
          "/event/" +
          eventID
      )
      .then((response: { data: Contract }) => response.data);
  }

  postContract(contract: object) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/contract", contract, {
        headers: { token: token }
      })
      .then((response: { data: Contract }) => console.log(response));
  }

  deleteContract(userID: number, eventID: number) {
    return axios
      .delete(
        process.env.REACT_APP_API_URL +
          "/contract/user" +
          userID +
          "/event/" +
          eventID
      )
      .then((response: { data: Contract }) => console.log(response));
  }
}

export default new ContractService();
