import http from "../http-common";

class OrderService {
  // Get all orders
  getAllOrders(data) {
    return http.get("/orders", data);
  }

  // Get all orders by UserId
  getAllUserOrders(userId) {
    return http.get(`/users/${userId}/orders`);
  }

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
    return http.put(`/orders/${orderId}`, data);
  }

  // Delete an order
  deleteOrder(orderId) {
    return http.delete(`/orders/${orderId}`);
  }
}

export default new OrderService();
