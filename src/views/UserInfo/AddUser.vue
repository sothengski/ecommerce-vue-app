<template>
  <div class="new-user-form">
    <h1>Create New User</h1>
    <form @submit.prevent="createUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="Enter user email"
          required
        />
      </div>

      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model="user.firstName"
          placeholder="Enter first name"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model="user.lastName"
          placeholder="Enter last name"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          id="phone"
          v-model="user.phone"
          placeholder="Enter phone number"
          required
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          v-model="user.address"
          placeholder="Enter address"
          required
        />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="user.role" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <div class="form-group">
        <label for="active">Active Status</label>
        <input type="checkbox" id="active" v-model="user.active" />
        <span>{{ user.active ? "Active" : "Inactive" }}</span>
      </div>

      <div class="form-group">
        <button type="submit" :disabled="isSubmitting">Create User</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Define the initial structure of the new user
      user: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        role: "user", // default role
        active: true, // default status is active
      },
      isSubmitting: false, // To disable the submit button during form submission
    };
  },
  methods: {
    async createUser() {
      this.isSubmitting = true;

      try {
        // Simulate API call to create the user
        const response = await this.$axios.post("/api/users", this.user);

        if (response.status === 201) {
          this.$router.push("/users"); // Redirect to the user list page after successful creation
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("There was an error creating the user.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.new-user-form {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.new-user-form h1 {
  text-align: center;
  margin-bottom: 20px;
}

.new-user-form .form-group {
  margin-bottom: 15px;
}

.new-user-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.new-user-form input,
.new-user-form select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.new-user-form button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.new-user-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
