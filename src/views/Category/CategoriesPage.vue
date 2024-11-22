<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryPage",
  data() {
    return {
      categories: [], // Holds the list of categories
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        if (response.data.success) {
          this.categories = response.data.data; // Assign the 'data' array to categories
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background: #f9f9f9;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

