<template>
  <div id="app">
    <!-- AppBar -->
    <header class="appbar">
      <div class="container">
        <!-- Left Section: Logo -->
        <div class="logo">
          <router-link to="/">FashionAura</router-link>
        </div>

        <!-- Middle Section: Nav Links -->
        <nav class="nav-links">
          <ul class="nav-left">
            <li><router-link to="/">Home</router-link></li>
            <!-- <li><router-link to="/categories">Categories</router-link></li> -->
            <li><router-link to="/products">Products</router-link></li>
          </ul>
        </nav>

        <!-- Right Section: Actions -->
        <div class="nav-actions">
          <ul class="nav-right">
            <li v-if="isAuthenticated">
              <router-link to="/cart">Cart</router-link>
            </li>

            <li v-if="!isAuthenticated">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!isAuthenticated">
              <router-link to="/register">Register</router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/dashboard">My Account</router-link>
            </li>
            <!-- <li v-if="isAuthenticated">
              <button @click="logout">Logout</button>
            </li> -->
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { logout } from "@/utils/auth";
import { authState } from "@/utils/authState";
// import CartService from "./services/CartService";
// import { loadCartItemCount, updateCartItemCount } from "./utils/cartState";

export default {
  name: "App",
  data() {
    return {
      user: null,
      // cartItems: [],
      // countItems: 0,
    };
  },
  created() {
    // this.fetchCart();
    // console.log(loadCartItemCount());
    // this.countItems = loadCartItemCount(); // Load cart item count from localStorage when component is created
  },
  computed: {
    isAuthenticated() {
      return authState.isAuthenticated; // Access the reactive auth state
    },

    // Computed property to calculate the total number of items in the cart
    // cartItemCount() {
    //   return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    // },
  },
  methods: {
    logout() {
      logout();
      authState.isAuthenticated = false; // Update the reactive state
      alert("You have logged out.");
      this.$router.push("/login");
    },
    // async fetchCart() {
    //   this.user = getUserData();

    //   try {
    //     const response = await CartService.getCartByUserId(this.user.id);

    //     if (response.data.success) {
    //       // console.log("cart request", response.data.data.items);

    //       this.cartId = response.data.data.id;
    //       updateCartItemCount(response.data.data.items.size);
    //       this.cartItems = response.data.data.items; // Set cart items
    //     } else {
    //       console.error("Failed to fetch cart:", response.data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching cart:", error);
    //   }
    // },
  },
  mounted() {
    // Optional: Log user data on mount
    if (this.isAuthenticated) {
      // this.fullname = getUserData().firstName + " " + getUserData().lastName;
      // console.log("User is authenticated.");
      // this.user = getUserData();
    } else {
      // console.log("User is not authenticated.");
    }
  },
};
</script>

<style>
/* Global styles */

body {
  margin: 0;
  font-family: Arial, sans-serif;
  /* background-color: #f6f4f3; */
}

/* AppBar styles */
.appbar {
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Container for appbar */
.appbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  border: none;
}

/* Logo styles */
.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: bold;
}

/* Navigation links */
.nav-links ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links ul li {
  margin-right: 20px;
}

.nav-links ul li a {
  color: white;
  text-decoration: none;
}

.nav-links ul li a:hover {
  text-decoration: underline;
  color: aquamarine;
}

/* Navigation actions */
.nav-actions ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  color: aquamarine;
}

.nav-actions ul li {
  margin-left: 15px;
}

.nav-actions ul li a,
.nav-actions ul li button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

.nav-actions ul li a:hover,
.nav-actions ul li button:hover {
  text-decoration: underline;
  color: aquamarine;
}

/* Main content styles */
.main-content {
  padding: 20px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .nav-links ul {
    display: none; /* Hide left navigation on small screens */
  }

  .nav-actions ul {
    flex-direction: column; /* Stack right navigation links vertically */
    align-items: flex-end;
  }
}
</style>
