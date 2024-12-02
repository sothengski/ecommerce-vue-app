# eCommerce-vue-app Frontend - Vue.js

## Overview
This is the frontend for an eCommerce application built with **Vue.js**. The app interacts with the backend (Spring Boot) for user authentication, product management, cart functionality, and order processing. It's designed for a responsive and dynamic user experience.

## Features
- **User Authentication**: User login and registration.
- **Role Management**: Displays user-specific views based on roles.
- **Product Display**: View products with details.
- **Cart Management**: Add/remove items in the shopping cart.
- **Order Management**: Place and view orders.
- **Category Navigation**: Filter products by categories.

## Tech Stack
- **Vue.js 3.x** (Vue CLI)
- **Vue Router** (for navigation)
- **Axios** (for API requests)
- **Node.js** (for development server)

## Getting Started

### Prerequisites
- Node.js 14.x or later
- npm or yarn (for package management)
- Access to the backend API (Spring Boot)

### Setup

1. Clone the repository:
   1. Front end Vue JS
    ```bash
    git clone https://github.com/sothengski/ecommerce-vue-app.git
    cd ecommerce-vue-app
    ```

   2. Back end Spring Boot
    ```bash
    git clone https://github.com/sothengski/ecommerce-app.git
    cd ecommerce-app
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure the API URL:
   - In `src/utils/axios.js` (or wherever your API calls are configured), set the base URL of your backend API.
   ```js
   const api = axios.create({
     baseURL: 'http://localhost:8080/api',  // Change this to your backend API URL
   });

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
