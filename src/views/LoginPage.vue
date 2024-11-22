<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="loginRequest.email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="loginRequest.password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="login-button">Login</button>
        <p>{{ this.message }}</p>
      </form>

      <p class="register-link">
        Don't have an account?
        <router-link to="/register">Register here</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "@/utils/auth";
import LoginService from "../services/LoginService";
import { authState } from "@/utils/authState";

export default {
  name: "LoginPage",
  data() {
    return {
      loginRequest: {
        email: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    async handleLogin() {
      LoginService.login(this.loginRequest)
        .then((response) => {
          // console.log(response); // Debug the full response
          const user = response.data.data;
          this.message = response.data.message;
          login(user);
          authState.isAuthenticated = true;

          // alert(`Login successful! ${user.email}`); // Use template literal for the email
          this.$router.push({ name: "UserInfo" });
        })
        .catch((e) => {
          this.loginRequest.email = "";
          this.loginRequest.password = "";
          this.message = e.response?.data?.message || "An error occurred"; // Handle undefined error message
          console.log(e.response?.data || e); // Log the error response
        });
    },
    mounted() {
      this.message = "Please Login!";
      //     console.error("Error:", error);
      //     alert("An error occurred while logging in.");
    },
  },
};
</script>

<style scoped>
/* Container Styling */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

/* Card Styling */
.login-card {
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Header */
.login-card h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Form Styling */
.form-group {
  margin-bottom: 15px;
  margin-right: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

/* Button Styling */
.login-button {
  width: 100%;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #007bff;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

/* Link Styling */
.register-link {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
