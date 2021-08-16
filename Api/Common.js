import axios from "axios";
import { BASEURL } from "../Config/Config";

function getToken() {
  let user = localStorage.getItem("user");
  let token = "";

  if (user !== null) {
    // console.log(JSON.parse(user));
    token = JSON.parse(user).tokens.access_token;
  }

  return "Bearer " + token;
}

export default axios.create({
  baseURL: `${BASEURL}`,
  headers: {
    "Content-type": "application/json",
    // "Authorization": getToken()
  },
});
