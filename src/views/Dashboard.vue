<template>
  <div class="dashboard">
    <!-- Left Sidebar -->
    <div class="sidebar">
      <ul>
        <li>
          <router-link to="/profile-info">User Information</router-link>
        </li>
        <li v-if="userRole === 'admin'">
          <router-link to="/roles-page">Role Management</router-link>
        </li>

        <li v-if="userRole === 'admin'">
          <router-link to="/users-page">User Management</router-link>
        </li>
        <li v-if="userRole === 'admin' || userRole === 'seller'">
          <router-link to="/categories-page">Category Management</router-link>
        </li>
        <li>
          <router-link to="/products-page">Product Management</router-link>
        </li>
        <li>
          <router-link to="/orders-page">Order Management</router-link>
        </li>
        <li class="logout">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getUserData, logout } from "@/utils/auth";
import { authState } from "@/utils/authState";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  userRole: "",
  methods: {
    logout() {
      logout();
      authState.isAuthenticated = false; // Update the reactive state
      alert("You have logged out.");
      this.$router.push("/login");
    },
  },
  async created() {
    const storedUser = getUserData();
    this.userRole = storedUser.role.name;
    // ...getUserData({
    //   userRole: "getUserRole", // Get user role from Vuex store
    // }),
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh; /* Full-height layout */
  margin: auto;
  overflow: hidden; /* Prevent scrolling on the main container */
}

.sidebar {
  width: 20%;
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  top: 0; /* Keep the sidebar fixed at the top when scrolling */
  height: 75vh; /* Full height */
  overflow-y: auto; /* Allows scrolling within the sidebar if the content exceeds height */
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
  border-radius: 5px;
  background-color: #e9ecef;
}

.sidebar ul li a.router-link-active {
  background-color: #007bff;
  color: white;
}

.main-content {
  width: 80%;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto; /* Allows content to scroll while the sidebar stays fixed */
}

/* Styling for the logout button */
.logout button {
  background-color: #dc3545; /* Red background */
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 25px;
  width: 100%;
}

.logout button:hover {
  background-color: #c82333; /* Darker red on hover */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.logout button:focus {
  outline: none;
  box-shadow: 0px 0px 5px #ff6b6b; /* Slight glow when focused */
}
</style>
