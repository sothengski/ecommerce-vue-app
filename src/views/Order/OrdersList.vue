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
