<template>
  <div class="container">
    <div class="header">
      <h2>User List</h2>
      <button class="add-btn" @click="addNewUser">Add New User</button>
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <span
              :class="{
                'status-active': user.active,
                'status-inactive': !user.active,
              }"
            >
              {{ user.active ? "Active" : "Inactive" }}
            </span>
          </td>
          <td>
            <button class="edit-btn" @click="editUser(user)">Edit</button>
            <button class="delete-btn" @click="deleteUser(user.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";

export default {
  data() {
    return {
      users: [], // To store the users fetched from the API
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await AuthService.getAllUsers();
        this.users = response.data.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    addNewUser() {
      // Navigate to the add user route
      this.$router.push("/user-list/add");
      // alert("Navigate to Add New User form or open a modal.");
    },

    editUser(user) {
      if (user && user.id) {
        // console.log(`${this.user.id}`);

        this.$router.push({
          name: "UpdateProfileInfo", // Assuming you have a route named "UpdateProfileInfo"
          params: { userId: user.id },
        });
      } else {
        console.error("User ID is missing");
      }
      // alert(`Editing user: ${user.name}`);
    },
    async deleteUser(userId) {
      const confirmed = confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        try {
          await AuthService.deleteUser(userId); // API call to delete the user
          alert("Role deleted successfully.");
          this.fetchUsers(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete the user.");
        }
      }
    },
  },
  created() {
    this.fetchUsers(); // Fetch users when the component is created
  },
};
</script>

<style scoped>
/* General styling for the page */
.container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* max-width: 1000px; */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-size: 24px;
  margin: 0;
  text-align: center;
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

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
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
