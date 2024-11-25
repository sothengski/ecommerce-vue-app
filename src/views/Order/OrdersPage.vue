<template>
  <div class="container">
    <router-view /> <!-- Dynamically loads the subcomponent -->
  </div>
</template>

<script>
export default {
  name: "OrdersPage",
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>