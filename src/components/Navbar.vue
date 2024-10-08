<template>
  <div>
    <nav class="bg-dark" style="width: 165px; height: 100vh">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link text-light" to="/admin"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-light"
            active-class="active"
            to="/admin/manager-user"
            >Manager User</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-light"
            active-class="active"
            to="/admin/manager-product"
            >Manager Product</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style>
.active {
  background-color: rgb(146, 146, 146);
  color: white;
}
</style>
