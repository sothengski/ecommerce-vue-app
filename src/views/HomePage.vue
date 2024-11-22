<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>
    At Trendy Threads, we believe fashion is more than just clothing – it's a statement. 
    Our curated collection offers the perfect blend of style, comfort, and quality to help you express yourself effortlessly.
  </p>
  <p>
    Whether you're looking for casual wear, office attire, or something special for an evening out, 
    we have everything you need to refresh your wardrobe. Explore our latest collections and find your next favorite outfit today!
  </p>
  <router-link to="" class="shop-now-btn">Shop Now</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.store-introduction {
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 10px;
  margin: 20px auto;
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

.shop-now-btn {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.shop-now-btn:hover {
  background-color: #0056b3;
}
</style>

