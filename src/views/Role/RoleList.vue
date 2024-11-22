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
        this.roles = response.data; // Assume the API returns an array of roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    addNewRole() {
      // Navigate to the add role route
      this.$router.push("/role-list/add");
      // Handle navigation to add role form or show a modal
      // alert("Navigate to Add New Role form or open a modal.");
    },
    editRole(role) {
      // Handle edit logic (e.g., show a form or navigate to an edit page)
      // alert(`Editing role: ${role.name}`);
      // You can implement a modal or redirect to an edit page
      this.$router.push(`/role-list/edit/${role.id}`);
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

<style scoped>
/* General styling for the page */
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-size: 24px;
  margin: 0;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

/* Styled table */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

/* Buttons styling */
button {
  cursor: pointer;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-btn {
  background-color: #17a2b8;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #138496;
}

.edit-btn {
  background-color: #28a745;
  color: white;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
