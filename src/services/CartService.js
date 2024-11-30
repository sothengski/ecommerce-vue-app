import http from "../http-common";

// import axios from "axios";
class CartService {
  // const API_URL = "/api/carts/users";

  // const getCartByUserId = (userId) => {
  //   return axios.get(`${API_URL}/${userId}`);
  // };

  // Get an user data by Id
  getCartByUserId(userId) {
    return http.get(`/carts/users/${userId}`);
  }
}
export default new CartService();
