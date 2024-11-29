<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script></script>

<style scoped>
.page {
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
