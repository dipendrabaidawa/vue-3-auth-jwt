import api from './api';

class UserService {
  getCandidates(credential) {
    return api.post(`/candidates?search=${credential.search}&perPage=${credential.perPage}&curPage=${credential.curPage}`);
  }

  getCandidate(id) {
    return api.post(`/candidates/${id}`);
  }
}

export default new UserService();