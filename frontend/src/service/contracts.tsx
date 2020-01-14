const axios = require('axios').default;

let url = "http://localhost:8080"

export class Contract {
  contract!: string;
  token!: string;
  eventID!: number;
}

class ContractService {
  getContracts() {
    return axios.get(url + '/contract').then((response: {data: Contract[]}) => response.data);
  }

  getContract(token: string, eventID: number) {
    return axios.get(url + '/contract/user' + token + '/event/' + eventID).then((response: {data: Contract}) => response.data);
  }

  postContract(contract: object) {
    return axios.post(url + '/contract', contract)
    .then((response: {data: Contract}) => console.log(response));
  }

  deleteContract(token: string, eventID: number) {
    return axios.delete(url + '/contract/user' + token + '/event/' + eventID).then((response: {data: Contract}) => console.log(response));
  }
}

export default new ContractService();
