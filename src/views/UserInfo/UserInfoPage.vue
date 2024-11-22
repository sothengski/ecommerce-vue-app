<template>
  <div class="container">
    <div class="layout">
      <!-- Left Tab Bar -->
      <div class="tab-bar">
        <ul>
          <li>
            <router-link to="/user-info" exact>User Information</router-link>
          </li>
          <li>
            <router-link to="/user-info/edit">Update Information</router-link>
          </li>
        </ul>
      </div>

      <!-- Right Content Area -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoPage",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

/* Layout */
.layout {
  display: flex;
  width: 100%;
  height: 100%;
}

/* Left Tab Bar */
.tab-bar {
  width: 30%;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 20px;
}

.tab-bar ul {
  list-style: none;
  padding: 0;
}

.tab-bar li {
  margin: 10px 0;
}

.tab-bar li a {
  display: block;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  color: #000;
}

.tab-bar li a.router-link-active {
  background-color: #007bff;
  color: white;
}

/* Right Content Area */
.content {
  width: 70%;
  padding: 20px;
}
</style>
