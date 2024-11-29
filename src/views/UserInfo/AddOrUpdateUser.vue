<template>
  <div class="container">
    <h2>{{ isUpdate ? "Update User Information" : "Add New User" }}</h2>
    <form @submit.prevent="submitUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :disabled="isUpdate"
          required
        />
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
        <input
          type="text"
          id="password"
          v-model="form.password"
          required
          v-if="!isUpdate"
        />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">
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
        <button type="submit">
          {{ isUpdate ? "Update User" : "Create User" }}
        </button>
        <button type="button" @click="cancelBtn">Cancel</button>
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
      isUpdate: false, // To determine if we're updating an existing user
      userId: null, // Store the user ID for updating
    };
  },
  methods: {
    async submitUser() {
      try {
        const userData = {
          email: this.form.email,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          address: this.form.address,
          password: this.form.password,
          roleId: this.form.role,
          active: this.form.active,
        };

        let response;
        if (this.isUpdate) {
          // Update user
          response = await AuthService.updateUserById(this.userId, userData);
        } else {
          // Add new user
          response = await AuthService.addNewUser(userData);
        }

        if (response.status === 200 || response.status === 201) {
          this.$router.go(-1); // Redirect to the user list
        }
      } catch (error) {
        console.error("Error submitting user:", error);
        alert("There was an error processing the user data.");
      }
    },
    // async addUser() {
    //   // Create a new user by sending a POST request to the server
    //   try {
    //     // console.log("Form Data: ", this.form);

    //     const response = await AuthService.addNewUser({
    //       email: this.form.email,
    //       firstName: this.form.firstName,
    //       lastName: this.form.lastName,
    //       phone: this.form.phone,
    //       address: this.form.address,
    //       password: this.form.password,
    //       roleId: this.form.role.id,
    //       active: this.form.active,
    //     });
    //     if (response.status === 201) {
    //       this.$router.go(-1); // Redirect to the user list after successful user creation
    //     }
    //   } catch (error) {
    //     console.error("Error creating user:", error);
    //     alert("There was an error creating the user.");
    //   }
    // },
    cancelBtn() {
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
    async fetchUser() {
      try {
        const response = await AuthService.getUserDetailbyId(this.userId);

        console.log(`response:`, response);

        this.form = {
          ...this.form,
          email: response.data.data.email,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          phone: response.data.data.phone,
          address: response.data.data.address,
          password: "", // Don't expose password
          role: response.data.data.role.id, // Set role ID
          active: response.data.data.active,
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  created() {
    this.fetchRoles(); // Fetch roles when the component is created

    const userId = this.$route.params.userId;
    if (userId) {
      this.isUpdate = true;
      this.userId = userId; // Get the user ID from route params
      this.fetchUser(); // Fetch the existing user's data
    }
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
