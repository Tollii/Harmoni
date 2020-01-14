const axios = require('axios').default;

let url = "http://localhost:8080";

export class Role {
  id!: number;
  role_name!: string;
}

class RoleService {
  getRoles() {
    return axios.get(url + '/role').then((response: {data:Roles[]}) => response.data);
  }

  getRole(id: number) {
    return axios.get(url + '/role/' + id).then((response: {data: Roles[]}) => response.data);
  }
}

export default new RoleService()

