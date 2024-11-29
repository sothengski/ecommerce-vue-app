<template>
  <div class="container">
    <h2>{{ isEdit ? "Update Category" : "Add Category" }}</h2>
    <form @submit.prevent="saveCategory">
      <div class="form-group">
        <label for="name">Category Name:</label>
        <input type="text" id="name" v-model="form.name" />
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
        <button type="submit" :disabled="!form.name.trim()">
          {{ isEdit ? "Update" : "Save" }}
        </button>

        <button type="button" @click="cancelBtn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import CategoryService from "../../services/CategoryService";

export default {
  data() {
    return {
      form: {
        id: null, // Holds the ID for updates
        name: "",
        active: true,
      },
      isEdit: false, // Flag to determine if it's an edit or add operation
    };
  },
  created() {
    // Check if editing an existing category
    const categoryId = this.$route.params.id;
    if (categoryId) {
      this.isEdit = true;
      this.loadCategory(categoryId);
    }
  },
  methods: {
    async loadCategory(categoryId) {
      try {
        const response = await CategoryService.getCategoryById(categoryId);
        this.form = {
          id: response.data.data.id,
          name: response.data.data.name,
          active: response.data.data.active,
        };
      } catch (error) {
        console.error("Error loading category:", error);
      }
    },
    async saveCategory() {
      if (this.isEdit) {
        // Update existing category
        try {
          await CategoryService.updateCategoryById(this.form.id, {
            name: this.form.name,
            active: this.form.active,
          });
          // alert("Category updated successfully!");
          this.$router.go(-1);
        } catch (error) {
          console.error("Error updating category:", error);
          alert("Failed to update category.");
        }
      } else {
        // Add new category
        try {
          await CategoryService.createCategory({
            name: this.form.name,
            active: this.form.active,
          });
          // alert("Category added successfully!");
          this.$router.go(-1);
        } catch (error) {
          console.error("Error adding category:", error);
          alert("Failed to add category.");
        }
      }
    },
    cancelBtn() {
      this.$router.go(-1);
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
