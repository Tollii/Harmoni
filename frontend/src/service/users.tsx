import axios from "axios";
import { useEffect } from "react";
import getCookie from "./cookie";

export class User {
  [x: string]: any;
  id!: number;
  username!: string;
  email!: string;
  hash!: string;
  phone!: string;
  picture!: string;
  createdAt!: string;
  updatedAt!: string;
  roleID!: number;
}
const token = getCookie("token");
class UserService {
  getAllUsers() {
    return axios
      .get<User[]>(process.env.REACT_APP_API_URL + "/user/", {
        headers: { token: token }
      })
      .then(response => response.data);
  }
  getOneUser() {
    return axios
      .get<User>(process.env.REACT_APP_API_URL + "/user/" + token)
      .then(response => response.data);
  }
  postOneUser(user: object) {
    return axios
      .post<boolean>(process.env.REACT_APP_API_URL + "/user/", user)
      .then(response => response.data);
  }
  updateOneUser(id: number, user: object) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/user/" + id, user, {
        headers: { token: token }
      })
      .then(response => response.data);
  }
  deleteOneUser(id: number, user: object) {
    return axios
      .delete(process.env.REACT_APP_API_URL + "/user/" + id, user)
      .then(response => response.data);
  }
  getArtist() {
    return axios
      .get<User[]>(process.env.REACT_APP_API_URL + "/artist/")
      .then((response: any) => response.data);
  }
}
export default new UserService();
