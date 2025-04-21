<template>
  <div class="home__view-inner">
    <div class="home__view-wrapper pt-[60px]">
      <div class="page__container">
        <nav-bar :style="{ top: navTop + 'px' }" class="home__view--nav-bar" />


        <home-footer/>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import NavBar from '@/components/sections/NavBar.vue';
import HomeFooter from '@/components/sections/HomeFooter.vue';
import { getUpcomingMovies } from '@/services/movieService';

export default {
  components: { NavBar, HomeFooter },
  setup() {
    const releaseFilmsData = ref([]);

    const navTop = ref(0);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 0 && navTop.value > -60) {
        navTop.value = Math.max(navTop.value - delta, -60);
      } else if (delta < 0 && navTop.value < 0) {
        navTop.value = Math.min(navTop.value - delta, 0);
      }

      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const fetchAPI = async (fetchFunction, targetData, limit, applyFilter = true) => {
      try {
        const response = await fetchFunction();
        if (!Array.isArray(response)) throw new Error(`Invalid response for ${targetData}`);
        targetData.value = applyFilter
          ? response.filter(({ backdrop_path, original_title, original_name, overview }) => 
              backdrop_path && (original_title || original_name) && overview).slice(0, limit)
          : response.slice(0, limit);
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    };

    fetchAPI(getUpcomingMovies, releaseFilmsData, 10);

    return { releaseFilmsData, navTop };
  }
};
</script>

<style scoped>
</style>