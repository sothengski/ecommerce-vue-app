<template>
  <div class="update-information">
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
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getUserData } from "@/utils/auth";

export default {
  name: "UpdateInformation",
  data() {
    return {
      updatedUser: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    const user = getUserData();
    this.updatedUser.email = user.email;
  },
  methods: {
    updateUserInfo() {
      alert(
        `User updated: Email=${this.updatedUser.email}, Password=${this.updatedUser.password}`
      );
      this.$router.push("/user-info");
    },
    cancelEdit() {
      this.$router.push("/user-info");
    },
  },
};
</script>

<style scoped>
.update-information {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.update-information form {
  display: flex;
  flex-direction: column;
}

.update-information form label {
  margin: 10px 0 5px;
}

.update-information form input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.update-information form .form-actions {
  display: flex;
  gap: 10px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
