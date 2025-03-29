import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomeView.vue";
import DiscoverFilmsPage from "@/pages/DiscoverFilmsPage.vue";

const routes = [
  { path: '/', component: HomePage},
  { path: '/discover-films', component: DiscoverFilmsPage},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router