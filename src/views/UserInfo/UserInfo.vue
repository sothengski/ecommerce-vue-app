<template>
  <div class="user-information">
    <div class="header">
      <h2>User Information</h2>
      <button class="edit-icon" @click="goToEdit">✏️</button>
    </div>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Role:</strong> {{ user.role.name }}</p>
    <p><strong>Status:</strong> {{ user.active ? "Active" : "Inactive" }}</p>
  </div>
</template>

<script>
import { getUserData } from "@/utils/auth";

export default {
  name: "UserInformation",
  data() {
    return {
      user: getUserData(),
    };
  },
  methods: {
    goToEdit() {
      this.$router.push("/user-info/edit");
    },
  },
};
</script>

<style scoped>
.user-information {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.header {
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
</style>
