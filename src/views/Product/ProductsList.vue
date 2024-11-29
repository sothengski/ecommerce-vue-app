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
          <th>Brand</th>
          <th>Price</th>
          <th>Stock</th>
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
          <td>{{ product.brand }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
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
      this.$router.push("/product-management/add");
    },
    editProduct(product) {
      this.$router.push(`/product-management/edit/${product.productId}`);
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
/* Same styling as RoleList.vue for consistency */
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
