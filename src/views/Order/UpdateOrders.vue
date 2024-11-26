<template>
    <div class="container">
      <h2>Update Order</h2>
      <form @submit.prevent="updateOrder">
        <div class="form-group">
          <label for="orderNumber">Order Number:</label>
          <input
            type="text"
            id="orderNumber"
            v-model="form.orderNumber"
            disabled
          />
        </div>
  
        <!-- <div class="form-group">
          <label for="totalItems">Total Items:</label>
          <input
            type="number"
            id="totalItems"
            v-model.number="form.totalItems"
            @input="recalculateTotalPrice"
            min="0"
          />
        </div> -->
<!--   
        <div class="form-group">
          <label for="totalPrice">Total Price:</label>
          <input
            type="text"
            id="totalPrice"
            :value="form.totalPrice"
            disabled
          />
        </div> -->
  
        <div class="form-group">
          <label for="orderStatus">Order Status:</label>
          <select id="orderStatus" v-model="form.orderStatus">
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
  
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
          orderId: null, // Order ID for updates
          orderNumber: "",
        //   totalItems: 0, 
        //   totalPrice: 0,
          orderStatus: "Pending",
        },
      };
    },
    computed: {
      isFormValid() {
        return (
          this.form.totalItems >= 0 &&
          this.form.orderStatus.trim() !== ""
        );
      },
    },
    created() {
      const orderId = this.$route.params.orderId;
      console.log("Fetched Order ID from route:", orderId); // Debugging here
      if (orderId) {
        this.loadOrder(orderId);
      }
    },
    methods: {
      async loadOrder(orderId) {
        console.log("Loading order with ID:", orderId); // Debugging here
        try {
          const response = await OrderService.getOrder(orderId);
          console.log("Order response data:", response.data); // Debugging API response
          const order = response.data;
          this.form = {
            ...this.form, // Preserve existing form structure
            orderId: order.orderId || null,
            orderNumber: order.orderNumber || "", // Ensure fallback values
            totalItems: order.totalQuantity || 0,
            totalPrice: order.totalPrice || 0,
            orderStatus: order.orderStatus || "Pending",
          };
        } catch (error) {
          console.error("Error loading order:", error);
          alert("Failed to load order.");
          
        }
      },
    //   recalculateTotalPrice() {
    //     // Example calculation: each item costs $10
    //     const pricePerItem = 10;
    //     this.form.totalPrice = this.form.totalItems * pricePerItem;
    //   },
      async updateOrder() {
        try {
          await OrderService.updateOrder(this.form.orderId, {
            // totalItems: this.form.totalItems,
            // totalPrice: this.form.totalPrice,
            orderStatus: this.form.orderStatus,
          });
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