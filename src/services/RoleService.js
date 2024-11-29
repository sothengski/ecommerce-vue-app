import http from "../http-common";

class RoleService {
  // Get all roles data
  getAllRoles() {
    return http.get("/roles");
  }

  // Get a role data by Id
  getRole(roleId) {
    return http.get(`/roles/${roleId}`);
  }

  // Create a new role
  createRole(inputData) {
    return http.post(`/roles`, inputData);
  }

  // Update a role
  updateRole(roleId, data) {
    return http.put(`/roles/${roleId}`, data);
  }

  // Delete a role
  deleteRole(roleId) {
    return http.delete(`/roles/${roleId}`);
  }
}

export default new RoleService();
