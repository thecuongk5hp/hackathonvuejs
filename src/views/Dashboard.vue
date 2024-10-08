<template>
  <div class="dashboard">
    <div class="page-content">
      <div v-if="currentPage === 'dashboard'">
        <h2>Dashboard Page</h2>
      </div>
      <div v-if="currentPage === 'category'">
        <h2>Manager Category Page</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const currentPage = ref("dashboard");
const setPage = (page) => {
  currentPage.value = page;
};
</script>
<style scoped>
.dashboard {
  margin: 20px;
}
.link-container {
  display: flex;
  gap: 20px;
  background-color: black;
  padding: 10px 20px;
}
.link-container span {
  font-size: 16px;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}
.link-container span.active {
  background-color: #444;
}
.link-container span:hover {
  background-color: #555;
}
.page-content {
  margin-top: 20px;
}
.page-content h2 {
  font-size: 24px;
}
.page-content p {
  font-size: 16px;
}
</style>
