<template>
  <body>
    <div class="grid-container">
      <div class="grid-item">
        <div class="store-introduction">
          <h1>Welcome to FashionAura</h1>
          <p>
            At FashionAura, we believe fashion is more than just clothing – it's
            a statement. Our curated collection offers the perfect blend of
            style, comfort, and quality to help you express yourself
            effortlessly.
          </p>
          <p>
            Whether you're looking for casual wear, office attire, or something
            special for an evening out, we have everything you need to refresh
            your wardrobe. Explore our latest collections and find your next
            favorite outfit today!
          </p>
          <br />
          <router-link to="/products" class="shop-now-btn"
            >Shop Now</router-link
          >
        </div>
      </div>
      <div class="grid-item">
        <img
          src="https://images.unsplash.com/photo-1604882767135-b41fac508fff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="HomePagePhoto"
          width="500"
          height="333"
        />
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.store-introduction {
  text-align: center;
  padding: 50px;
  background-color: white;
  color: #333;
  border-radius: 0px;
  margin: 20px;
  max-width: 800px;
}

.store-introduction h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.store-introduction p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.grid-container {
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: white;
}

img {
  width: 1028px;
  height: 100%;
}

.shop-now-btn {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #343a40;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.shop-now-btn:hover {
  background-color: whitesmoke;
}
</style>
