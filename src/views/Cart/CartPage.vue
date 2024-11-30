<template>
  <div class="cart-container">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="cart-item-details">
          <!-- Product Image -->
          <img
            :src="item.product.images[0]"
            :alt="item.product.name"
            class="cart-item-image"
          />
          <div class="cart-item-info">
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.description }}</p>
            <p><strong>Price:</strong> ${{ item.product.price }}</p>
          </div>
        </div>

        <div class="cart-item-quantity">
          <button @click="updateQuantity(item, -1)" class="quantity-btn">
            -
          </button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item, 1)" class="quantity-btn">
            +
          </button>
        </div>

        <div class="cart-item-total">
          <strong>Total:</strong> ${{
            (item.quantity * item.product.price).toFixed(2)
          }}
        </div>

        <!-- Remove Button -->
        <button @click="removeItem(item)" class="remove-btn">Remove</button>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <p><strong>Total Price: </strong> ${{ totalPrice.toFixed(2) }}</p>
        <button @click="checkoutCart" class="checkout-button">Checkout</button>
        <!-- Success/Error Message -->
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/services/CartService";
import axios from "axios";

export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [], // List of cart items
      cartId: null, // Cart ID
    };
  },
  created() {
    this.fetchCart();
  },
  computed: {
    // Calculate the total price of all items in the cart
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    },
  },
  methods: {
    async fetchCart() {
      // Get the user's cart ID from localStorage or user context
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.id) {
        console.error("User not logged in.");
        return;
      }

      try {
        const response = await CartService.getCartByUserId(userData.id);

        if (response.data.success) {
          this.cartId = response.data.data.id;
          this.cartItems = response.data.data.items; // Set cart items
        } else {
          console.error("Failed to fetch cart:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },

    async updateQuantity(item, change) {
      // Calculate the new quantity
      const newQuantity = item.quantity + change;
      if (newQuantity < 1) return; // Prevent negative or zero quantity

      try {
        const response = await axios.put(
          `http://localhost:8080/api/carts/${this.cartId}/update-item`,
          null, // No body needed for this request, parameters are in the URL
          {
            params: {
              itemId: item.id,
              newQuantity: newQuantity,
            },
          }
        );

        if (response.data.success) {
          item.quantity = newQuantity; // Update the local cart item quantity
        } else {
          console.error("Failed to update quantity:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    },

    async removeItem(item) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/carts/${this.cartId}/remove-item`, // No body needed for this request, parameters are in the URL
          {
            params: {
              itemId: item.id,
            },
          }
        );

        if (response.data.success) {
          // Remove the item from the local cart items array
          const index = this.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          if (index !== -1) {
            this.cartItems.splice(index, 1); // Remove item from array
          }
        } else {
          console.error("Failed to remove item:", response.data.message);
        }
      } catch (error) {
        console.error("Error removing item:", error);
      }
    },

    async checkoutCart() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/carts/${this.cartId}/checkout`
        );
        if (response.data.success) {
          alert("Order Placed Successfully");
          window.location.reload();
        } else {
          alert("Failed to place the order.");
        }
      } catch (error) {
        console.error("Error placing the order:", error);
        this.message = "An error occurred while placing the order.";
      }
    },
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.cart-item-details {
  display: flex;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

.quantity-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.cart-item-total {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
}

.remove-btn {
  background-color: red;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.remove-btn:hover {
  background-color: darkred;
}

.cart-summary {
  margin-top: 30px;
  text-align: right;
}

.checkout-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
</style>
