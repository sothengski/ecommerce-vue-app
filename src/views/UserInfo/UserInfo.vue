<template>
  <div class="container">
    <div class="header">
      <h2>User Information</h2>
      <button class="edit-icon" @click="goToEdit">✏️</button>
    </div>
    <div v-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>Role:</strong> {{ user.role.name }}</p>
      <p>
        <strong>Status: </strong>
        <span
          :class="{
            'status-active': user.active,
            'status-inactive': !user.active,
          }"
        >
          {{ user.active ? "Active" : "Inactive" }}
        </span>
      </p>
    </div>
    <div v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

<script>
import { getUserData } from "@/utils/auth";

export default {
  name: "UserInformation",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    goToEdit() {
      this.$router.push("/user-info/edit");
    },
  },

  created() {
    // Get user ID from localStorage and fetch user data
    const storedUser = getUserData();
    if (storedUser) {
      this.user = storedUser;
    } else {
      console.error("No user ID found in localStorage");
    }
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
  text-align: center;
}

p {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

strong {
  font-weight: bold;
  color: #333;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
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
</style>
