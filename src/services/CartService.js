import axios from "axios";

const API_URL = "/api/carts/users";

const getCartByUserId = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

export default {
  getCartByUserId,
};
