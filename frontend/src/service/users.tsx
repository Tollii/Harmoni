import axios from "axios";
import getCookie from "./cookie";
import { User } from "./interface";

class UserService {
  getAllUsers() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/user/", {
        headers: { token: getCookie("token") }
      })
      .then((response) => response.data);
  }
  getOneUser() {
    return axios
      .get<User>(process.env.REACT_APP_API_URL + "/user/" + getCookie("token"))
      .then((response) => {
        return response.data
      });
  }
  postOneUser(user: User) {
    return axios
      .post(process.env.REACT_APP_API_URL + "/user/", user)
      .then(response => response.data);
  }
  updateOneUser(id: number, user: User) {
    return axios
      .put(process.env.REACT_APP_API_URL + "/user/" + id, user, {
        headers: { token: getCookie("token") }
      })
      .then(response => response.data);
  }
  getArtist() {
    return axios
      .get<User[]>(process.env.REACT_APP_API_URL + "/artist/")
      .then((response: any) => response.data);
  }
}

export default new UserService();