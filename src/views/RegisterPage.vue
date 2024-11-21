<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Create Your Account</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" class="register-button">Register</button>
      </form>

      <p class="login-link">
        Already have an account?
        <router-link to="/login">Login here</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("https://your-api-url.com/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registration successful!");
          this.$router.push("/login");
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering.");
      }
    },
  },
};
</script>

<style scoped>
/* Container Styling */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

/* Card Styling */
.register-card {
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Header */
.register-card h2 {
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
.register-button {
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

.register-button:hover {
  background-color: #0056b3;
}

/* Link Styling */
.login-link {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
