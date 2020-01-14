import axios from "axios";
import { useEffect } from "react";

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
const base = "http://localhost:8080/user/";
class UserService {
  getAllUsers() {
    return axios.get<User[]>(base).then(response => response.data);
  }
  getOneUser(token: string) {
    return axios
      .get<User>(base + token)
      .then(response => response.data);
  }
  postOneUser(user: object) {
    return axios
      .post<boolean>(base , user)
      .then(response => response.data);
  }
  updateOneUser(id: number, user: object) {
    return axios
      .put(base + id, user)
      .then(response => response.data);
  }
  deleteOneUser(id: number, user: object) {
    return axios
      .delete(base + id, user)
      .then(response => response.data);
  }
  getArtist() {
    return axios.get<User[]>(base + "artist/").then(response => response.data);
  }
}
export let userService = new UserService();
