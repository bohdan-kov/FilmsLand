import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomeView.vue";
import DiscoverFilmsPage from "@/pages/DiscoverFilmsPage.vue";
import MediaDetailsPage from "@/pages/MediaDetailsPage.vue";

const routes = [
  { path: '/', component: HomePage},
  { path: '/discover-films', component: DiscoverFilmsPage},
  { path: '/media-details/:id', component: MediaDetailsPage},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router