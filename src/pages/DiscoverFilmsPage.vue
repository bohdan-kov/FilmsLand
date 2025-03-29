<template>
  <div class="discover__films-inner">
    <div class="discover__films-wrapper pt-[60px]">
      <div class="page__container">
        <nav-bar :style="{ top: navTop + 'px' }" class="discover__films--nav-bar" />
      </div>


      <div class="page__container">
        <home-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import NavBar from '@/components/sections/NavBar.vue';
import HomeFooter from '@/components/sections/HomeFooter.vue';
import { getUpcomingMovies, getPopularMovies, getPopularSeries, getTrendingMovies } from '@/services/movieService';

export default {
  components: { NavBar, HomeFooter },
  setup() {
    const releaseFilmsData = ref([]);
    const trendingFilmsData = ref([]);
    const popularFilmsData = ref([]);
    const popularSeriesData = ref([]);

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
    fetchAPI(getTrendingMovies, trendingFilmsData, 15);
    fetchAPI(getPopularMovies, popularFilmsData, 15);
    fetchAPI(getPopularSeries, popularSeriesData, 15);

    return { releaseFilmsData, trendingFilmsData, popularFilmsData, popularSeriesData, navTop };
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  width: 100%;
  transition: top 0.3s ease-in-out;
  z-index: 1000;
  max-width: 1500px;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.content-wrapper {
  padding-top: 60px;
}
</style>