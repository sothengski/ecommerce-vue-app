<template>
  <div class="page-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Search by Product Name -->
    <div class="search-container">
      <h2>Search Product Name</h2>
        <input
          type="text"
          v-model="searchQuery"
          class="search-input"
        />
      </div>
      <!-- Search by Category -->
      <h3>Filter by Category</h3>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <label>
            <input
              type="checkbox"
              :value="category.id"
              v-model="selectedCategories"
            />
            {{ category.name }}
          </label>
        </li>
      </ul>
    </aside>
    <!-- Main Content -->
    <main class="main-content">
      <h1>Products</h1>
      <div class="products-container">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <!-- Main Image -->
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="product-image"
          />

          <!-- Product Details -->
          <div class="product-details">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p><strong>Brand:</strong> {{ product.brand }}</p>
            <p><strong>Price:</strong> ${{ product.price }}</p>
            <p><strong>Stock:</strong> {{ product.stock }}</p>
            <p><strong>Category:</strong> {{ product.category.name }}</p>

            <!-- Sizes -->
            <p><strong>Sizes:</strong></p>
            <ul class="sizes-list">
              <li v-for="size in product.size" :key="size">{{ size }}</li>
            </ul>

            <!-- Colors -->
            <p><strong>Colors:</strong></p>
            <ul class="colors-list">
              <li
                v-for="color in product.color"
                :key="color"
                class="color-box"
                :style="{ backgroundColor: color.toLowerCase() }"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductPage",
  data() {
    return {
      products: [], // Holds the list of products
      categories: [], // Holds the list of categories
      selectedCategories: [], // Tracks selected category IDs
      searchQuery: "",
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  computed: {
    // Filter products based on selected categories
    filteredProducts() {
      let filtered = this.products;

      // Filter by categories if any are selected
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter((product) =>
          this.selectedCategories.includes(product.category.id)
        );
      }

      // Filter by product name based on the search query
      if (this.searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        if (response.data.success) {
          this.products = response.data.data; // Assign the 'data' array to products
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
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
/* Layout */
.page-container {
  display: flex;
  align-items: flex-start;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #ddd;
  position: sticky;
  top: 0; 
  height: 100vh; 
  overflow-y: auto; 
}
.sidebar h2 {
  margin-top: 65px;
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

.sidebar h3 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

.sidebar .search-container {
  margin-top: 20px;
  margin-right: 30px;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
}

.main-content h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Products Container */
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Product Card */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Product Image */
.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* Product Details */
.product-details {
  text-align: left;
}

/* Sizes List */
.sizes-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 5px;
}

.sizes-list li {
  padding: 5px 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
}

/* Colors List */
.colors-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 5px;
}

.color-box {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>