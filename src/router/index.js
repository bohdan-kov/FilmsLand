import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomeView.vue";
import PopularFilmsPage from "@/pages/PopularFilmsPage.vue";

const routes = [
  { path: '/', component: HomePage},
  { path: '/popular', component: PopularFilmsPage},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router