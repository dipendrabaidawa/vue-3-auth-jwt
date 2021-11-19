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

// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';

// class AuthService {
//   login(user) {
//     return axios
//       .post(API_URL + 'signin', {
//         username: user.username,
//         password: user.password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem('user', JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem('user');
//   }

//   register(user) {
//     return axios.post(API_URL + 'signup', {
//       username: user.username,
//       email: user.email,
//       password: user.password
//     });
//   }
// }

// export default new AuthService();