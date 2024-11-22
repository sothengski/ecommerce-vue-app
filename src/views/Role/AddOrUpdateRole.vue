<template>
  <div class="page">
    <h2>Add or Update Role</h2>
    <form @submit.prevent="saveRole">
      <div class="form-group">
        <label for="roleName">Role Name:</label>
        <input type="text" id="roleName" v-model="roleName" />
      </div>

      <div class="form-actions">
        <button type="submit" @click="saveRole">Save</button>
        <button type="button" @click="cancelBtn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        roleName: "",
      },
      // roleName: "",
    };
  },
  methods: {
    saveRole() {
      alert(`Saving role: ${this.roleName}`);
      // Add logic for saving the role
    },
    cancelBtn() {
      this.$router.push("/role-list");
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px; /* Set a maximum width for the form container */
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.page form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.page label {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.page input,
textarea,
button {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin: 5px 0 10px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
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
