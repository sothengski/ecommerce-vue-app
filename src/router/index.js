import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import CartPage from "@/views/Cart/CartPage.vue";
import CategoriesPage from "@/views/Category/CategoriesPage.vue";
import ProductsPage from "@/views/Product/ProductsPage.vue";
import OrdersPage from "@/views/Order/OrdersPage.vue";
import OrdersList from "@/views/Order/OrdersList.vue";
import UpdateOrders from "@/views/Order/UpdateOrders.vue";
import Dashboard from "@/views/Dashboard.vue";
import RoleList from "@/views/Role/RoleList.vue";
import UserInfo from "@/views/UserInfo/UserInfo.vue";
import UpdateUserInfo from "@/views/UserInfo/UpdateUserInfo.vue";
import { isAuthenticated } from "@/utils/auth";
import AddOrUpdateRole from "@/views/Role/AddOrUpdateRole.vue";
import RolePage from "@/views/Role/RolePage.vue";
import UserList from "@/views/UserInfo/UserList.vue";
import ProductsPage2 from "@/views/Product/ProductsPage2.vue";
import ProductsList from "@/views/Product/ProductsList.vue";
import UpdateProducts from "@/views/Product/UpdateProducts.vue";
import AddUser from "@/views/UserInfo/AddUser.vue";

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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/profile-info", // Redirect to Profile Information by default
    children: [
      // Profile Module
      {
        path: "/profile-info",
        name: "ProfileInfo",
        component: UserInfo,
        meta: { requiresAuth: true },
      },
      {
        path: "/profile-info/edit/:userId",
        name: "UpdateProfileInfo",
        component: UpdateUserInfo,
        meta: { requiresAuth: true },
      },
      // Profile Module

      // Role Module
      {
        path: "/roles-page",
        name: "RolePage",
        component: RolePage,
        meta: { requiresAuth: true },
        redirect: "/role-list", // Default to role list
        children: [
          {
            path: "/role-list",
            name: "RoleList",
            component: RoleList,
            meta: { requiresAuth: true },
          },
          {
            path: "/role-list/add",
            name: "AddRole",
            component: AddOrUpdateRole,
            meta: { requiresAuth: true },
          },
          {
            path: "/role-list/edit/:id",
            name: "EditRole",
            component: AddOrUpdateRole,
            meta: { requiresAuth: true },
          },
        ],
      },
      // Role Module

      // User Module
      {
        path: "/users-page",
        name: "UpdateUser",
        component: UserList,
        redirect: "/user-list", // Default to users list
        children: [
          {
            path: "/user-list",
            name: "UsersList",
            component: UserList,
            meta: { requiresAuth: true },
          },
          {
            path: "/user-list/edit/:userId",
            name: "UpdateUserInfo",
            component: UpdateUserInfo,
            meta: { requiresAuth: true },
          },
          {
            path: "/user-list/add",
            name: "AddUser",
            component: AddUser,
            meta: { requiresAuth: true },
          },
        ],
      },
      // User Module

      // Order Module
      {
        path: "/orders-page",
        name: "OrdersPage",
        component: OrdersPage,
        meta: { requiresAuth: true },
        redirect: "/order-list", // Default to orders list
        children: [
          {
            path: "/order-list",
            name: "OrdersList",
            component: OrdersList,
            meta: { requiresAuth: true },
          },
          {
            path: "/order-list/add",
            name: "AddOrder",
            component: UpdateOrders, // Component for adding an order
            meta: { requiresAuth: true },
          },
          {
            path: "/order-list/edit/:orderId",
            name: "EditOrder",
            component: UpdateOrders, // Component for editing an order
            meta: { requiresAuth: true },
          },
        ],
      },
      // Order Module

      // Product Module
      {
        path: "/products-page",
        name: "ProductsPage",
        component: ProductsPage2,
        meta: { requiresAuth: true },
        redirect: "/product-list", // Default to product list
        children: [
          {
            path: "/product-list",
            name: "ProductsList",
            component: ProductsList,
            meta: { requiresAuth: true },
          },
          {
            path: "/product-list/add",
            name: "AddProduct",
            component: UpdateProducts,
            meta: { requiresAuth: true },
          },
          {
            path: "/product-list/edit/:productId",
            name: "EditProduct",
            component: UpdateProducts,
            meta: { requiresAuth: true },
          },
        ],
      },
      // Product Module
    ],
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
