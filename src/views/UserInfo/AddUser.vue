<template>
  <div class="container">
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="form.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="form.lastName" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" v-model="form.phone" />
      </div>
      <div class="form-group">
        <label for="address">Shipping Address</label>
        <textarea id="address" v-model="form.address"></textarea>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" id="password" v-model="form.password" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role" required>
          <option v-for="role in roles" :key="role" :value="role">
            {{ role.name }}
          </option>
        </select>
      </div>
      <div class="form-group checkbox-group">
        <label for="active">Active Status</label>
        <div class="checkbox-container">
          <input type="checkbox" id="active" v-model="form.active" />
          <span class="checkbox-label">{{
            form.active ? "Active" : "Inactive"
          }}</span>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit">Create User</button>
        <button type="button" @click="cancelAdd">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import RoleService from "../../services/RoleService";

export default {
  data() {
    return {
      roles: [], // To store the roles fetched from the API
      form: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        password: "12345678",
        role: 3,
        active: true, // Default to active
      },
    };
  },
  methods: {
    async addUser() {
      // Create a new user by sending a POST request to the server
      try {
        // console.log("Form Data: ", this.form);

        const response = await AuthService.addNewUser({
          email: this.form.email,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          address: this.form.address,
          password: this.form.password,
          roleId: this.form.role.id,
          active: this.form.active,
        });
        if (response.status === 201) {
          this.$router.go(-1); // Redirect to the user list after successful user creation
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("There was an error creating the user.");
      }
    },
    cancelAdd() {
      // Redirect to the user list page without adding a user
      this.$router.go(-1);
    },
    async fetchRoles() {
      try {
        const response = await RoleService.getAllRoles();
        this.roles = response.data;
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
  },
  created() {
    this.fetchRoles(); // Fetch roles when the component is created
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.container form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.container label {
  margin-bottom: 5px;
}

.container input,
textarea,
select,
button {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin: 5px 0 10px;
  box-sizing: border-box;
}

.container form .form-actions {
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
/* Custom styling for the checkbox */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.checkbox-label {
  font-size: 18px;
  color: #333;
}

/* Simplified checkbox styling */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
