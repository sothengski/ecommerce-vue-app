<template>
  <div class="container">
    <h2>{{ isEdit ? "Update Role" : "Add Role" }}</h2>
    <form @submit.prevent="saveRole">
      <div class="form-group">
        <label for="roleName">Role Name:</label>
        <input type="text" id="roleName" v-model="form.roleName" />
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="!form.roleName.trim()">
          {{ isEdit ? "Update" : "Save" }}
        </button>

        <button type="button" @click="cancelBtn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import RoleService from "../../services/RoleService";

export default {
  data() {
    return {
      form: {
        id: null, // Holds the ID for updates
        roleName: "",
      },
      isEdit: false, // Flag to determine if it's an edit or add operation
    };
  },
  created() {
    // Check if editing an existing role
    const roleId = this.$route.params.id;
    if (roleId) {
      this.isEdit = true;
      this.loadRole(roleId);
    }
  },
  methods: {
    async loadRole(roleId) {
      try {
        const response = await RoleService.getRole(roleId);
        this.form = {
          id: response.data.id,
          roleName: response.data.name,
        };
      } catch (error) {
        console.error("Error loading role:", error);
      }
    },
    async saveRole() {
      if (this.isEdit) {
        // Update existing role
        try {
          await RoleService.updateRole(this.form.id, {
            name: this.form.roleName,
          });
          // alert("Role updated successfully!");
          this.$router.push("/role-list");
        } catch (error) {
          console.error("Error updating role:", error);
          alert("Failed to update role.");
        }
      } else {
        // Add new role
        try {
          await RoleService.createRole(this.form.roleName);
          // alert("Role added successfully!");
          this.$router.push("/role-list");
        } catch (error) {
          console.error("Error adding role:", error);
          alert("Failed to add role.");
        }
      }
    },
    cancelBtn() {
      this.$router.push("/role-list");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
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

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

button[type="submit"]:hover:enabled {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
  color: white;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
