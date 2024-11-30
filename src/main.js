import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/styles.css"; // Import global CSS file

const app = createApp(App);

app.use(router);

app.mount("#app");

/**
 * Buyer
 *      Home page
 *
 *1      Products List in the Home Page
 *
 **2      Cart Management (List)
 **3      Checkout Page for input shippingAddress and Payment
 **4      Success Order popup dialog or page
 *
 **5      Order Management (Order History List belong to them)
 *6      Update Order Page
 *7      Order Detail
 *
 *
 * Seller
 *
 *8      Product Management(List)
 *9      Add/Update Product for each product
 *10      Product Detail
 *
 *11      Order Management (Order List that belong to buyer orders their products)
 *12      Update Order for status
 *      Order Detail (same page use for all user types)
 *
 * Admin
 *
 *13      Role Management (All Roles)
 *14     Add/Update Role
 *15      Role Detail
 *
 *16      User Management (All Users)
 *17      Add/Update User
 *18      User Detail
 *
 *      Product Management(List) (same page use for all user types)
 *      Product Detail (same page use for all user types)
 *
 *19      Category (List)
 *20      Add/Update Category
 *
 *      Order Management (All Orders)
 *      Order Detail (same page use for all user types)
 */
