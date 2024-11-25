import http from "../http-common";

class OrderService {
  // Get all orders
  getAllOrders(data) {
    return http.get("/orders", data);
  }
  
  // Get all orders by UserId
  // getAllOrders(userId) {
  //   return http.get(`/orders/users/${userId}`);
  // }
  
  // Get an order by Id
  getOrder(orderId) {
    return http.get(`/orders/${orderId}`);
  }


  // Create a new order
  createOrder(inputData) {
    return http.post(`/orders`, inputData);
  }

  // Update an order
  updateOrder(orderId, data) {
    return http.put(`/roles/${orderId}`, data);
  }

  // Delete an order
  deleteOrder(orderId) {
    return http.delete(`/roles/${orderId}`);
  }
}

export default new OrderService();