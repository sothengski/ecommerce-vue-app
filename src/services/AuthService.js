import http from "../http-common";

class AuthService {
  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    // Overwrite active and roleId to enforce the constants
    const updatedData = {
      ...data,
      active: false, // Enforce active as false
      roleId: 3, // Enforce roleId as 3
    };
    return http.post("/users", updatedData);
  }
}

export default new AuthService();
