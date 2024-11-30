<template>
  <div class="container">
    <div class="header">
      <h2>Role List</h2>
      <button class="add-btn" @click="addNewRole">Add New Role</button>
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Role Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <button class="edit-btn" @click="editRole(role)">Edit</button>
            <button class="delete-btn" @click="deleteRole(role.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RoleService from "../../services/RoleService";

export default {
  data() {
    return {
      roles: [], // To store the roles fetched from the API
    };
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await RoleService.getAllRoles();
        this.roles = response.data;
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    addNewRole() {
      // Navigate to the add role route
      this.$router.push("/role-list/add");
      // alert("Navigate to Add New Role form or open a modal.");
    },
    editRole(role) {
      this.$router.push(`/role-list/edit/${role.id}`);
      // alert(`Editing role: ${role.name}`);
    },
    async deleteRole(roleId) {
      const confirmed = confirm("Are you sure you want to delete this role?");
      if (confirmed) {
        try {
          await RoleService.deleteRole(roleId); // API call to delete the role
          alert("Role deleted successfully.");
          this.fetchRoles(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting role:", error);
          alert("Failed to delete the role.");
        }
      }
    },
  },
  created() {
    this.fetchRoles(); // Fetch roles when the component is created
  },
};
</script>

<style>
.container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
