<template>
  <div class="user-info-page">
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
.user-info-page {
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

<template>
  <div class="user-info-page">
    <!-- Layout Container -->
    <div class="layout">
      <!-- Left Tab Bar -->
      <div class="tab-bar">
        <ul>
          <li
            :class="{ active: selectedTab === 'userInfo' }"
            @click="selectTab('userInfo')"
          >
            User Information
          </li>
          <li
            :class="{ active: selectedTab === 'updateInfo' }"
            @click="selectTab('updateInfo')"
          >
            Update Information
          </li>
        </ul>
      </div>

      <!-- Right Main Content -->
      <div class="content">
        <!-- User Information Tab -->
        <div v-if="selectedTab === 'userInfo'">
          <div class="header">
            <h2>User Information</h2>
            <button class="edit-icon" @click="selectTab('updateInfo')">
              ✏️
            </button>
          </div>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> {{ user.role.name }}</p>
          <p>
            <strong>Status:</strong> {{ user.active ? "Active" : "Inactive" }}
          </p>
        </div>

        <!-- Update Information Tab -->
        <div v-if="selectedTab === 'updateInfo'">
          <h2>Update Information</h2>
          <form @submit.prevent="updateUserInfo">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="updatedUser.email"
              placeholder="Enter new email"
            />
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="updatedUser.password"
              placeholder="Enter new password"
            />
            <div class="form-actions">
              <button type="submit">Update</button>
              <button type="button" @click="selectTab('userInfo')">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

--- ### Script Section ```vue
<script>
import { getUserData } from "@/utils/auth";

export default {
  name: "UserInfoPage",
  data() {
    return {
      selectedTab: "userInfo", // Default tab
      user: getUserData(),
      updatedUser: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
      if (tab === "updateInfo") {
        // Pre-fill the update form with current user data
        this.updatedUser.email = this.user.email;
        this.updatedUser.password = "";
      }
    },
    updateUserInfo() {
      // Logic to update user information
      alert(
        `User updated: Email=${this.updatedUser.email}, Password=${this.updatedUser.password}`
      );
      // After update, switch back to user information tab
      this.selectTab("userInfo");
    },
  },
};
</script>

<style scoped>
.user-info-page {
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
  padding: 10px;
  cursor: pointer;
  background-color: #e9ecef;
  border-radius: 5px;
  text-align: center;
}

.tab-bar li.active {
  background-color: #007bff;
  color: white;
}

/* Right Content Area */
.content {
  width: 70%;
  padding: 20px;
}

.content .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-icon {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;
}

.edit-icon:hover {
  color: #0056b3;
}

.content h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.content form {
  display: flex;
  flex-direction: column;
}

.content form label {
  margin: 10px 0 5px;
}

.content form input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.content form .form-actions {
  display: flex;
  gap: 10px;
}

.content form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content form button:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
