import http from "../http-common";

class ProductService {
  // Get all products
  getAllProducts(data) {
    return http.get("/products", data);
  }

  // Get a product by Id
  getProduct(productId) {
    return http.get(`/products/${productId}`);
  }

  // Get all products by UserId
  getAllUserProducts(userId) {
    return http.get(`/products/users/${userId}`);
  }

  // Create a new product
  createProduct(inputData) {
    return http.post(`/products`, inputData);
  }

  // Update a product by productId
  updateProduct(productId, data) {
    return http.put(`/products/${productId}`, data);
  }

  // Delete an order by productId
  deleteProduct(productId) {
    return http.delete(`/products/${productId}`);
  }
}

export default new ProductService();
