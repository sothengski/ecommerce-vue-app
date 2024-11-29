<template>
  <div class="container">
    <h2>Update Order</h2>
    <form @submit.prevent="updateOrder">
      <!-- Order Number -->
      <div class="form-group">
        <label for="orderNumber">Order Number:</label>
        <input
          type="text"
          id="orderNumber"
          v-model="form.orderNumber"
          disabled
        />
      </div>

      <!-- Order Items -->
      <div class="form-group">
        <label for="items">Order Items:</label>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>
                <img
                  :src="item.product.images[0]"
                  alt="Product Image"
                  class="product-image"
                />
              </td>
              <td>{{ item.product.name }}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  v-model.number="item.quantity"
                  @input="updateItemTotal(index)"
                />
              </td>
              <td>{{ item.unitPrice }}</td>
              <td>{{ item.quantity * item.unitPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Price -->
      <div class="form-group">
        <label for="totalPrice">Total Price:</label>
        <input type="text" id="totalPrice" :value="form.totalPrice" disabled />
      </div>

      <!-- Order Status -->
      <div class="form-group">
        <label for="orderStatus">Order Status:</label>
        <select id="orderStatus" v-model="form.orderStatus">
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="cancelUpdate">Cancel</button>
        <button type="submit" :disabled="!isFormValid">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import OrderService from "../../services/OrderService";

export default {
  data() {
    return {
      form: {
        orderId: null,
        orderNumber: "",
        totalPrice: 0,
        orderStatus: "Pending",
        userId: null, // Add userId if it's needed
        orderDate: "", // Ensure this is populated from backend or form
        currency: "USD",
        paymentStatus: "Pending",
        paymentMethod: "Credit Card",
        shippingAddress: "",
        shippingCost: 0,
      },
      items: [],
    };
  },
  computed: {
    isFormValid() {
      return this.form.orderStatus.trim() !== "";
    },
  },
  created() {
    const orderId = this.$route.params.orderId;
    //   console.log("Fetched Order ID from route:", orderId);
    if (orderId) {
      this.loadOrder(orderId);
    }
  },
  methods: {
    async loadOrder(orderId) {
      // console.log("Loading order with ID:", orderId);
      try {
        const response = await OrderService.getOrder(orderId);
        //   console.log("Order response data:", response.data);

        const order = response.data;

        // Update form data
        this.form = {
          orderId: order.data.orderId || null,
          orderNumber: order.data.orderNumber || "",
          orderStatus: order.data.orderStatus || "Pending",
          orderDate: order.data.orderDate || "", // Ensure it's correctly formatted, if needed
          userId: order.data.userId || null, // Assuming the userId is returned in the order data
          currency: order.data.currency || "USD",
          paymentStatus: order.data.paymentStatus || "Pending",
          paymentMethod: order.data.paymentMethod || "Credit Card",
          shippingAddress: order.data.shippingAddress || "",
          shippingCost: order.data.shippingCost || 0,
        };

        // Update items from the response
        this.items = order.data.items || [];

        // Recalculate the total price based on the items
        this.recalculateTotalPrice();
      } catch (error) {
        console.error("Error loading order:", error);
        alert("Failed to load order.");
      }
    },
    updateItemTotal(index) {
      // Update the total price of the order whenever item quantity changes
      const item = this.items[index];
      if (item.quantity < 1) {
        item.quantity = 0; // Ensure minimum quantity is 0
      }
      this.recalculateTotalPrice();
    },
    recalculateTotalPrice() {
      this.form.totalPrice = this.items.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
      );
    },
    async updateOrder() {
      try {
        // Log the order ID and form data being sent
        console.log("Order ID:", this.form.orderId);
        console.log("Total Price:", this.form.totalPrice);
        console.log("Order Status:", this.form.orderStatus);

        // Prepare updated items data (only sending the changed ones)
        const updatedItems = this.items.map((item) => ({
          id: item.id, // Item ID to match existing record
          quantity: item.quantity, // Updated quantity
        }));

        // Log the updated items array
        console.log("Updated Items:", updatedItems);

        // Send the complete order object, including updated items, to the backend
        const orderPayload = {
          userId: this.form.userId,
          orderNumber: this.form.orderNumber,
          orderStatus: this.form.orderStatus,
          orderDate: this.form.orderDate,
          currency: this.form.currency,
          paymentStatus: this.form.paymentStatus,
          paymentMethod: this.form.paymentMethod,
          shippingAddress: this.form.shippingAddress,
          shippingCost: this.form.shippingCost,
          items: updatedItems, // Only send updated items
        };

        // Log the full order data being sent
        console.log("Updated Order Data:", orderPayload);

        await OrderService.updateOrder(this.form.orderId, orderPayload);

        // Success message and redirect
        alert("Order updated successfully!");
        this.$router.push("/order-management");
      } catch (error) {
        console.error("Error updating order:", error);
        alert("Failed to update order.");
      }
    },
    cancelUpdate() {
      this.$router.push("/order-management");
    },
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  cursor: pointer;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button[type="button"] {
  background-color: #dc3545;
  color: white;
}
</style>
