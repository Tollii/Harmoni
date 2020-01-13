const axios = require('axios').default;

let url = "http://localhost:8080";

export class Rider_Type {
  id!: number;
  description!: string;
}

class Rider_TypeService {
  getEvent_Types() {
    return axios.get(url + '/rider_type').then((response: {data: JSON}) => response.data);
  }

  getEvent_Type(id: number) {
    return axios.get(url + '/rider_type' + id).then((response: {data: JSON}) => response.data);
  }
}

export let rider_typeService = new Rider_TypeService();
