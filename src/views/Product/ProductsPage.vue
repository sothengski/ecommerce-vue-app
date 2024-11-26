<template>
  <div class="page-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Filter by Category</h2>
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
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  computed: {
    // Filter products based on selected categories
    filteredProducts() {
      if (this.selectedCategories.length === 0) {
        return this.products; // Show all products if no category is selected
      }
      return this.products.filter((product) =>
        this.selectedCategories.includes(product.category.id)
      );
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
  font-size: 24px;
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
  font-size: 18px;
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