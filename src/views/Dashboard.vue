<template>
  <div class="dashboard">
    <!-- Left Sidebar -->
    <div class="sidebar">
      <ul>
        <li>
          <router-link to="/user-info">User Information</router-link>
        </li>
        <li>
          <router-link to="/role-list">Role Management</router-link>
        </li>
        <li>
          <router-link to="/user-management">User Management</router-link>
        </li>
        <li>
          <router-link to="/category-management"
            >Category Management</router-link
          >
        </li>
        <li>
          <router-link to="/product-management">Product Management</router-link>
        </li>
        <li>
          <router-link to="/order-management">Order Management</router-link>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
};
</script>

<style scoped>
.dashboard {
  display: flex;
  /*  height: 100vh; /* Full-height layout */
  margin: auto;
}

.sidebar {
  width: 20%;
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
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
}
</style>
