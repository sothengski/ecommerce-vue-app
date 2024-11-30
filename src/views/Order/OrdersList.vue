<template>
  <div class="container">
    <div class="header">
      <h2>Order List</h2>
      <!-- <button class="add-btn" @click="addNewOrder">Add New Order</button> -->
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Number</th>
          <th>Total Items</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td>{{ order.orderNumber }}</td>
          <td>{{ order.items.length }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.orderStatus }}</td>
          <td>
            <button class="edit-btn" @click="editOrder(order)">Edit</button>
            <button class="delete-btn" @click="deleteOrder(order.orderId)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from "@/services/OrderService";

export default {
  name: "OrderList",
  data() {
    return {
      orders: [], // Store the list of orders
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await OrderService.getAllOrders();
        this.orders = response.data.data; // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders.");
      }
    },
    addNewOrder() {
      this.$router.push("/order-list/add");
    },
    editOrder(order) {
      this.$router.push(`/order-list/edit/${order.orderId}`);
    },
    async deleteOrder(orderId) {
      const confirmed = confirm("Are you sure you want to delete this order?");
      if (confirmed) {
        try {
          await OrderService.deleteOrder(orderId);
          alert("Order deleted successfully.");
          this.fetchOrders(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting order:", error);
          alert("Failed to delete the order.");
        }
      }
    },
  },
  created() {
    this.fetchOrders(); // Fetch orders on component creation
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
