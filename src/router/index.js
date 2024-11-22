import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import CategoriesPage from "@/views/Category/CategoriesPage.vue";
import ProductsPage from "@/views/Product/ProductsPage.vue";
import CartPage from "@/views/Cart/CartPage.vue";
import OrdersPage from "@/views/Order/OrdersPage.vue";
import Dashboard from "@/views/Dashboard.vue";
import RoleList from "@/views/Role/RoleList.vue";
import UserInfo from "@/views/UserInfo/UserInfo.vue";
import UpdateUserInfo from "@/views/UserInfo/UpdateUserInfo.vue";
import { isAuthenticated } from "@/utils/auth";
import AddOrUpdateRole from "@/views/Role/AddOrUpdateRole.vue";
import RolePage from "@/views/Role/RolePage.vue";

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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/user-info", // Redirect to User Information by default
    children: [
      {
        path: "/user-info",
        name: "UserInfo",
        component: UserInfo,
        meta: { requiresAuth: true },
      },
      {
        path: "/user-info/edit",
        name: "UpdateUserInfo",
        component: UpdateUserInfo,
        meta: { requiresAuth: true },
      },
      {
        path: "/rolepage",
        name: "RolePage",
        component: RolePage,
        meta: { requiresAuth: true },
        redirect: "/role-list", // Redirect to User Information by default

        children: [
          {
            path: "/role-list",
            name: "RoleList",
            component: RoleList,
            meta: { requiresAuth: true },
          },
          {
            path: "/role-list/add",
            name: "AddOrUpdateRole",
            component: AddOrUpdateRole,
            meta: { requiresAuth: true },
          },
        ],
      },

      // {
      //   path: "product-management",
      //   name: "ProductManagement",
      //   component: ProductManagement,
      // },
      // {
      //   path: "category-management",
      //   name: "CategoryManagement",
      //   component: CategoryManagement,
      // },
      // {
      //   path: "order-management",
      //   name: "OrderManagement",
      //   component: OrderManagement,
      // },
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
