<template>
  <div class="container">
    <h2>Update User Information</h2>
    <form @submit.prevent="updateUserInfo">
      <!-- <div class="form-group">
        <label for="userName">Username</label>
        <input type="text" id="userName" v-model="form.userName" required />
      </div> -->
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
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>
      <div class="form-group">
        <label for="address">Shipping Address</label>
        <textarea id="address" v-model="form.address" required></textarea>
      </div>
      <div class="form-actions">
        <button type="submit">Update</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
// import { getUserData } from "@/utils/auth";
import AuthService from "../../services/AuthService";

export default {
  data() {
    return {
      // userId: getUserData().id,
      // userId: null, // Store userId from route params
      user: null, // Store the user details

      form: {
        // userName: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      },
    };
  },

  async created() {
    // Accessing route params directly when component is created
    const userId = this.$route.params.userId;
    if (userId) {
      this.userId = userId; // Store userId in the component's data
      console.log(`User ID at created: ${userId}`);
      await this.loadUserInfo(userId); // Initial load when the component is first created
    } else {
      console.error("No userId found in route parameters");
    }
  },

  methods: {
    async loadUserInfo(userId) {
      console.log(`Loading user info for ID: ${userId}`);

      try {
        const response = await AuthService.getUserDetailbyId(userId);
        console.log("Server response:", response);

        this.form = {
          // userName: response.data.data.userName,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          phone: response.data.data.phone,
          address: response.data.data.address,
        };
      } catch (error) {
        console.error("Error loading user:", error);
      }
    },
    async updateUserInfo() {
      try {
        const updatedUserInfo = await AuthService.updateUserById(
          this.userId,
          this.form
        ); // API call to update user
        console.log("Server response:", updatedUserInfo.data);

        // savedUserData(updatedUserInfo.data);

        alert("User information updated successfully!");
        this.$router.go(-1);
        // this.$router.push({ name: "ProfileInfo" }); // Navigate back to user info page
      } catch (error) {
        console.error("Error updating user information:", error);
        alert("Failed to update user information.");
      }
      // alert(
      //   `User updated: FirstName=${this.form.firstName}, LastName=${this.form.lastName}`
      // );
    },

    cancelEdit() {
      this.$router.go(-1); // Go back to the previous page
      // this.$router.push({ name: "ProfileInfo" }); // Navigate back to user info page
    },
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

.container label form {
  margin-bottom: 5px;
}

.container input,
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
</style>
