<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/categories">Categories</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/orders">Orders</router-link></li>
        <li v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { isAuthenticated, logout } from "@/utils/auth";

export default {
  name: "App",

  computed: {
    isAuthenticated() {
      return isAuthenticated();
      // return !!localStorage.getItem("user-token");
    },
  },
  methods: {
    logout() {
      logout();
      alert("You have logged out.");
      this.$router.push("/login");
      // localStorage.removeItem("user-token");
      // this.$router.push("/login");
    },
  },
};
</script>
<style>
/* Add some basic styling */
#app {
  font-family: Arial, sans-serif;
  margin: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #007bff;
}

nav ul li a.router-link-active {
  font-weight: bold;
}
</style>
