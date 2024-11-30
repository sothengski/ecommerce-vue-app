<template>
  <div class="container">
    <div class="header">
      <h2>Category List</h2>
      <button class="add-btn" @click="addNewCategory">Add New Category</button>
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <span
              :class="{
                'status-active': category.active,
                'status-inactive': !category.active,
              }"
            >
              {{ category.active ? "Active" : "Inactive" }}
            </span>
          </td>
          <td>
            <button class="edit-btn" @click="editCategory(category)">
              Edit
            </button>
            <button class="delete-btn" @click="deleteCategory(category.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CategoryService from "../../services/CategoryService";

export default {
  data() {
    return {
      categories: [], // To store the categories fetched from the API
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await CategoryService.getAllCategories();

        this.categories = response.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    addNewCategory() {
      // Navigate to the add category route
      this.$router.push({ name: "AddCategory" });
      // alert("Navigate to Add New Category form or open a modal.");
    },
    editCategory(category) {
      this.$router.push({
        name: "UpdateCategory",
        params: { id: category.id },
      }); // alert(`Editing category: ${category.name}`);
    },
    async deleteCategory(categoryId) {
      const confirmed = confirm(
        "Are you sure you want to delete this category?"
      );
      if (confirmed) {
        try {
          await CategoryService.deleteCategory(categoryId); // API call to delete the category
          alert("Category deleted successfully.");
          this.fetchCategories(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting category:", error);
          alert("Failed to delete the category.");
        }
      }
    },
  },
  created() {
    this.fetchCategories(); // Fetch cateogies when the component is created
  },
};
</script>

<style scoped>
/* Styled table */
.container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
