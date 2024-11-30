<template>
  <div class="container">
    <h2>{{ isEdit ? "Update Product" : "Add Product" }}</h2>
    <form @submit.prevent="saveProduct">
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="form.productName" />

        <label for="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          v-model="form.productDescription"
        ></textarea>

        <label for="productBrand">Product Brand:</label>
        <input type="text" id="productBrand" v-model="form.productBrand" />

        <label for="productPrice">Product Price:</label>
        <input type="text" id="productPrice" v-model="form.productPrice" />

        <label for="productStock">Product Stock:</label>
        <input type="text" id="productStock" v-model="form.productStock" />

        <label for="productSize">Product Size:</label>
        <input
          type="text"
          id="productSize"
          v-model="form.productSize"
          placeholder="e.g., S, M, L, XL"
        />

        <label for="productColor">Product Color:</label>
        <input
          type="text"
          id="productColor"
          v-model="form.productColor"
          placeholder="e.g., Red, Blue, Green"
        />

        <label for="productImages">Product Images (URL):</label>
        <input type="text" id="productImages" v-model="form.productImages" />

        <label for="userName">Belong to User:</label>
        <input type="text" id="userName" v-model="userName" :disabled="true" />

        <!-- <label for="CategoryId">Category ID:</label>
        <input type="text" id="categoryId" v-model="form.categoryId" /> -->

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="form.categoryId" required>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- <label for="isActive">Active:</label>
        <input type="checkbox" id="isActive" v-model="form.isActive" /> -->

        <div class="form-group checkbox-group">
          <label for="isActive">Active Status</label>
          <div class="checkbox-container">
            <input type="checkbox" id="isActive" v-model="form.isActive" />
            <span class="checkbox-label">{{
              form.isActive ? "Active" : "Inactive"
            }}</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button
          type="submit"
          :disabled="
            !String(form.productName).trim() ||
            !String(form.productBrand).trim() ||
            !String(form.productPrice).trim() ||
            !String(form.productStock).trim()
          "
        >
          {{ isEdit ? "Update" : "Save" }}
        </button>

        <button type="button" @click="cancelBtn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import CategoryService from "@/services/CategoryService";
import ProductService from "../../services/ProductService";
import { getUserData } from "@/utils/auth";

export default {
  data() {
    return {
      categories: [], // To store the categories fetched from the API
      userId: null,
      userName: null,

      form: {
        productId: null, // Holds the ID for updates
        productName: "",
        productDescription: "",
        productBrand: "",
        productPrice: "",
        productStock: "",
        productSize: "",
        productColor: "",
        productImages: "",
        isActive: true,
        userId: null,
        categoryId: null,
      },
      isEdit: false, // Flag to determine if it's an edit or add operation
    };
  },
  created() {
    this.fetchCategories(); // Fetch categories when the component is created

    const productId = this.$route.params.productId;
    if (productId) {
      this.isEdit = true;
      this.loadProduct(productId);
    } else {
      // Get user data from localStorage and assign to `user`
      const storedUser = getUserData();

      if (storedUser) {
        // this.user = storedUser;
        this.userId = storedUser.id;
        this.userName = storedUser.firstName + " " + storedUser.lastName;
      } else {
        console.error("No user data found in localStorage");
      }
    }
  },

  methods: {
    async loadProduct(productId) {
      try {
        const response = await ProductService.getProduct(productId);
        this.userId = response.data.data.user.id;
        this.userName =
          response.data.data.user.firstName +
          " " +
          response.data.data.user.lastName;

        this.form = {
          productId: response.data.data.productId, // Ensure you access the correct nested data
          productName: response.data.data.name || "",
          productDescription: response.data.data.description || "",
          productBrand: response.data.data.brand || "",
          productPrice: response.data.data.price || "",
          productStock: response.data.data.stock || "",
          productSize: Array.isArray(response.data.data.size)
            ? response.data.data.size.join(",")
            : "",
          productColor: Array.isArray(response.data.data.color)
            ? response.data.data.color.join(",")
            : "",
          productImages: Array.isArray(response.data.data.images)
            ? response.data.data.images.join(",")
            : "",
          userId: response.data.data.user ? response.data.data.user.id : null,
          categoryId: response.data.data.category.id,
          isActive:
            response.data.data.active !== undefined
              ? response.data.data.active
              : true,
        };
      } catch (error) {
        console.error("Error loading product:", error);
      }
    },
    async saveProduct() {
      const productData = {
        name: this.form.productName,
        description: this.form.productDescription,
        brand: this.form.productBrand,
        price: parseFloat(this.form.productPrice),
        stock: parseInt(this.form.productStock),
        size: this.form.productSize.split(",").map((size) => size.trim()), // Convert to list
        color: this.form.productColor.split(",").map((color) => color.trim()), // Convert to list
        images: this.form.productImages.split(",").map((image) => image.trim()), // Convert to list
        active: this.form.isActive,
        userId: this.isEdit ? this.form.userId : this.userId,
        categoryId: this.form.categoryId,
      };
      if (this.isEdit) {
        // Update existing product
        try {
          await ProductService.updateProduct(this.form.productId, productData);
          this.$router.go(-1);
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Failed to update product.");
        }
      } else {
        // Add new product
        try {
          await ProductService.createProduct(productData);
          this.$router.go(-1);
        } catch (error) {
          console.error("Error adding product:", error);
          alert("Failed to add product.");
        }
      }
    },
    cancelBtn() {
      this.$router.go(-1);
    },
    async fetchCategories() {
      try {
        const response = await CategoryService.getAllCategories();
        this.categories = response.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
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

.container label {
  margin-bottom: 5px;
}

.container input,
textarea,
select,
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
