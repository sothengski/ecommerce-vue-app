<template>
  <div class="page-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Search by Product Name -->
      <div class="search-container">
        <h2>Search Product Name</h2>
        <input type="text" v-model="searchQuery" class="search-input" />
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
      <!-- Price Range -->
      <h3>Filter by Price</h3>
      <div class="price-range-container">
        <div class="price-range-labels">
          <span>${{ Number(priceRange.min).toFixed(2) }}</span>
          <span>${{ Number(priceRange.max).toFixed(2) }}</span>
        </div>
        <div class="price-range-sliders">
          <input
            type="range"
            v-model="priceRange.min"
            min="10"
            max="1990"
            step="10"
            class="price-range-slider"
            id="minPrice"
          />
          <input
            type="range"
            v-model="priceRange.max"
            min="10"
            max="1990"
            step="10"
            class="price-range-slider"
            id="maxPrice"
          />
        </div>
      </div>
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

            <!-- Add to Cart Button -->
            <button @click="addToCart(product)" class="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { updateCartItemCount } from "@/utils/cartState";
import axios from "axios";

export default {
  name: "ProductPage",
  data() {
    return {
      products: [], // Holds the list of products
      categories: [], // Holds the list of categories
      selectedCategories: [], // Tracks selected category IDs
      searchQuery: "",
      priceRange: { min: 10.0, max: 1990.0 },
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

      // Filter by price range
      filtered = filtered.filter(
        (product) =>
          product.price >= this.priceRange.min &&
          product.price <= this.priceRange.max
      );

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
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        if (response.data.success) {
          this.categories = response.data.data; // Assign the 'data' array to categories
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    // Add to Cart method
    async addToCart(product) {
      // Step 1: Get the logged-in user's ID and cart ID from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.id) {
        console.error("User not logged in.");
        return;
      }

      const cartId = await this.getUserCartId(userData.id);
      if (!cartId) {
        console.error("User's cart not found.");
        return;
      }

      // Step 2: Prepare the request payload
      const payload = {
        productId: product.id,
        quantity: 1, // Default quantity (can be adjusted in cart based on input from user)
      };

      // Step 3: Send the POST request to add the item to the cart
      try {
        const response = await axios.post(
          `http://localhost:8080/api/carts/${cartId}/add-item`,
          payload
        );

        if (response.data.success) {
          console.log("Item added to cart:", response.data);
          // You can also show a notification or update UI here
          updateCartItemCount(response.data.data.items.size);
        } else {
          console.error("Failed to add item to cart:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    },

    // Get User's Cart ID
    async getUserCartId(userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/carts/users/${userId}`
        );
        if (response.data.success) {
          return response.data.data.id;
        } else {
          console.error("Error fetching user's cart:", response.data.message);
          return null;
        }
      } catch (error) {
        console.error("Error fetching user's cart:", error);
        return null;
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

/* Sidebar Product Name Search */
.sidebar h2 {
  margin-top: 65px;
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
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007bff;
}

/* Sidebar Category Filter */
.sidebar h3 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
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

/* Price Range Section */
.price-range-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.price-range-sliders {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.price-range-slider {
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 5px;
  -webkit-appearance: none;
  appearance: none;
}

.price-range-slider::-webkit-slider-runnable-track {
  height: 5px;
  background: #ddd;
  border-radius: 5px;
}

.price-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #000000;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Button Styles */
.add-to-cart-btn {
  background-color: darkred;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #218838;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-to-cart-btn:focus {
  outline: none;
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

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
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
