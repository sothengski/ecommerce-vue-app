<template>
  <div class="container">
    <div class="header">
      <h2>Product List</h2>
      <button class="add-btn" @click="addNewProduct">Add New Product</button>
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Seller</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.productId"
          @click="console.log(product)"
        >
          <td>{{ product.productId }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>

          <td>{{ product.brand }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.user.firstName }} {{ product.user.lastName }}</td>

          <td>
            <span
              :class="{
                'status-active': product.active,
                'status-inactive': !product.active,
              }"
            >
              {{ product.active ? "Active" : "Inactive" }}
            </span>
          </td>
          <td>
            <button class="edit-btn" @click="editProduct(product)">Edit</button>
            <button
              class="delete-btn"
              @click="deleteProduct(product.productId)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: "ProductList",
  data() {
    return {
      products: [], // Store the list of products
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await ProductService.getAllProducts();
        this.products = response.data.data; // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      }
    },
    addNewProduct() {
      this.$router.push({ name: "AddProduct" });
    },
    editProduct(product) {
      this.$router.push(`/product-list/edit/${product.productId}`);
    },
    async deleteProduct(productId) {
      const confirmed = confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        try {
          await ProductService.deleteProduct(productId);
          alert("Product deleted successfully.");
          this.fetchProducts(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete the product.");
        }
      }
    },
  },
  created() {
    this.fetchProducts(); // Fetch products on component creation
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
