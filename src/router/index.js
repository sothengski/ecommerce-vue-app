import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import CategoriesPage from "@/views/CategoriesPage.vue";
import ProductsPage from "@/views/ProductsPage.vue";
import CartPage from "@/views/CartPage.vue";
import OrdersPage from "@/views/OrdersPage.vue";
import UserInfo from "@/views/UserInfoPage.vue";
import { isAuthenticated } from "@/utils/auth";

// Simulating authentication state
// const isAuthenticated = () => !!localStorage.getItem("user-token");

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/categories", name: "Categories", component: CategoriesPage },
  { path: "/products", name: "Products", component: ProductsPage },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user-info",
    name: "UserInfo",
    component: UserInfo,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard for authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert("You need to login to access this page.");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
