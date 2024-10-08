import { createRouter, createWebHistory } from "vue-router"; 
import Dashboard from "/src/views/Dashboard.vue"; 
import ManagerCategory from "/src/views/ManagerCategory.vue"; 
import ProductManager from "/src/views/ProductManager.vue"; 
const routes = [
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard, 
  },
  {
    path: '/admin/manager-category',
    name: 'ManagerCategory',
    component: ManagerCategory,
  },
  {
    path: '/admin/manager-product',
    name: 'ManagerProduct',
    component: ProductManager,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), 
  routes,
});

export default router;  
