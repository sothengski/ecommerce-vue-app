import http from "../http-common";

class RoleService {
  getAllRoles(data) {
    return http.get("/roles", data);
  }

  // Delete a role
  deleteRole(roleId) {
    return http.delete(`/roles/${roleId}`);
  }
}

export default new RoleService();
