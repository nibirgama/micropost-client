import http from "./Common";

class Authentication {
  signUp(data) {
    return http.post(`/user/register`, data);
  }

  login(data) {
    return http.post(`/user/authenticate`, data);
  }

  getUser(id) {
    return http.get(`/user/authenticate`);
  }
}

export default new Authentication();
