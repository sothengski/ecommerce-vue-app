import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
