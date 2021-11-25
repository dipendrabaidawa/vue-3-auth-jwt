import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ email, password }) {
    return api
      .post("/auth/signin", {
        email,
        password
      })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }

  logout() {
    api
      .post("/auth/signout", {
        refresh: TokenService.getLocalRefreshToken()
      })
      .then((response) => {
        console.log("SIGN OUT: ", response)
      });
      TokenService.removeUser();
  }

  register({ first_name, last_name, email, password, confirm_password }) {
    return api.post("/auth/signup", {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    });
  }
}

export default new AuthService();