<template>
  <div id="app">
    <nav class="nav-bar">
      <router-link to="/admin" class="nav-link" active-class="active-link">Dashboard</router-link>
      <router-link to="/admin/manager-category" class="nav-link" active-class="active-link">Manager Category</router-link>
      <router-link to="/admin/manager-product" class="nav-link" active-class="active-link">Manager Product</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>

</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-start;
  background-color: black;
  padding: 10px; 
}

.nav-link {
  margin-right: 20px; 
  font-size: 16px; 
  color: white;
  text-decoration: none;
  padding: 5px 10px; 
  border-radius: 4px; 
}

.nav-link:hover {
  background-color: #555; 
}

.active-link {
  background-color: #333; 
  color: white;
}
</style>
