<template>
  <div class="update-user-info">
    <h2>Update User Information</h2>
    <form @submit.prevent="updateUserInfo">
      <div class="form-group">
        <label for="userName">Username</label>
        <input type="text" id="userName" v-model="form.userName" required />
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
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>
      <div class="form-group">
        <label for="shippingAddress">Shipping Address</label>
        <textarea
          id="shippingAddress"
          v-model="form.shippingAddress"
          required
        ></textarea>
      </div>
      <div class="form-actions">
        <button type="submit">Update</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        firstName: "",
        lastName: "",
        phone: "",
        shippingAddress: "",
      },
    };
  },
  methods: {
    async updateUserInfo() {
      alert(
        `User updated: FirstName=${this.form.firstName}, LastName=${this.form.lastName}`
      );
      // try {
      //   // Example of an API call to update user information
      //   const response = await fetch("/api/update-user", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(this.form),
      //   });

      //   if (response.ok) {
      //     const result = await response.json();
      //     alert("User information updated successfully!");
      //     console.log("Server response:", result);
      //     this.$router.push("/user-info");
      //   } else {
      //     throw new Error("Failed to update user information.");
      //   }
      // } catch (error) {
      //   console.error(error);
      //   alert("An error occurred while updating user information.");
      // }
    },
    cancelEdit() {
      this.$router.push("/user-info");
    },
  },
};
</script>

<style scoped>
.update-user-info {
  padding: 20px;
  background-color: #f9f9f9;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.update-user-info form {
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 15px;
}

.update-user-info label form {
  margin-bottom: 5px;
}

.update-user-info input,
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

.update-user-info form .form-actions {
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
