import axios from "axios";
import { useEffect } from "react";
import getCookie from "./cookie"

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
const base = "http://localhost:8080/";
const token = getCookie("token");
class UserService {
  getAllUsers() {
    return axios.get<User[]>(base + "user/").then(response => response.data);
  }
  getOneUser() {
    return axios
      .get<User>(base + "user/" + token)
      .then(response => response.data);
  }
  postOneUser(user: object) {
    return axios
      .post<boolean>(base + "user/", user)
      .then(response => response.data);
  }
  updateOneUser(id: number, user: object) {
    return axios.put(base + "user/" + id, user).then(response => response.data);
  }
  deleteOneUser(id: number, user: object) {
    return axios
      .delete(base + "user/" + id, user)
      .then(response => response.data);
  }
  getArtist() {
    return axios
      .get<User[]>(base + "artist/")
      .then((response: any) => response.data);
  }
}
export default new UserService();
