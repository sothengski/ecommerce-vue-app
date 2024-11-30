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
      this.$router.push({ name: "AddUser" });
      // alert("Navigate to Add New User form or open a modal.");
      // this.$router.push("/users-page/user-list/add");
    },

    editUser(user) {
      if (user && user.id) {
        // console.log(`${this.user.id}`);

        this.$router.push({
          name: "UpdateUser", // Assuming you have a route named "UpdateProfileInfo"
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
          alert("User deleted successfully.");
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
/* Styled table */
.container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
