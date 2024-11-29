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
/* General styling for the page */
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-size: 24px;
  margin: 0;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

/* Styled table */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

/* Buttons styling */
button {
  cursor: pointer;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-btn {
  background-color: #17a2b8;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #138496;
}

.edit-btn {
  background-color: #28a745;
  color: white;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
