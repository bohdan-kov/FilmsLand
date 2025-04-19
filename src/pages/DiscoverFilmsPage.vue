<template>
  <div class="discover__films-inner">
    <div class="discover__films-wrapper pt-[60px]">
      <div class="page__container mb-[50px] min-h-screen">
        <nav-bar :style="{ top: navTop + 'px' }" class="discover__films--nav-bar" />

        <h2 class="mt-[50px] text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">Discover Films</h2>
        {{ discoverFilters }}
        <button @click="fetchDiscoverMovies">Fetch</button>

        <div class="discover__films-box flex gap-[30px]">
          <div class="discover__films-filters min-w-[260px] max-w-[260px] flex flex-col gap-3">
            <sort-dropdown v-model="discoverFilters.sort_by"/>
            <filters-dropdown v-model="discoverFilters" :genreListsData="genreListsData"/>
          </div>
          <div class="discover__films-content">
            <media-list-card :mediaDate="discoverFilmsData"/>
          </div>
        </div>

        <div class="pagination mt-8 flex justify-center items-center gap-4">
        <button
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          :disabled="discoverFilters.page === 1"
          @click="changePage(discoverFilters.page - 1)"
        >
          Prev
        </button>

        <span class="text-lg">Page {{ discoverFilters.page }}</span>

        <button
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          @click="changePage(discoverFilters.page + 1)"
        >
          Next
        </button>
      </div>

      </div>

      <div class="page__container">
        <home-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import NavBar from '@/components/sections/NavBar.vue';
import HomeFooter from '@/components/sections/HomeFooter.vue';
import { getGenreMovies, getDiscoverMovies } from '@/services/movieService';
import SortDropdown from '@/components/filter-panel/SortDropdown.vue';
import FiltersDropdown from '@/components/filter-panel/FiltersDropdown.vue';
import MediaListCard from '@/components/cards/MediaListCard.vue';


export default {
  components: { NavBar, HomeFooter, SortDropdown, FiltersDropdown, MediaListCard, },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const discoverFilmsData = ref([]);
    const genreListsData = ref([]);
    const pageCache = ref(new Map());

    const discoverFilters = ref({
      sort_by: 'popularity.desc',
      page: parseInt(route.query.page) || 1,
      'release_date.gte': '',
      'release_date.lte': '',
      'with_genres': '',
      'vote_average.gte': '',
      'vote_average.lte': '',
      'vote_count.gte': '',
    })

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
      fetchDiscoverMovies();
      fetchGenreMovies()
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    watch(() => discoverFilters.value.page, (newPage) => {
      router.push({ path: '/discover-films', query: { ...route.query, page: newPage } });
    });

    watch(discoverFilters, () => {
      fetchDiscoverMovies();
    }, { deep: true });

    const fetchAPI = async (fetchFunction, targetData, limit, applyFilter = true, dataFilter) => {
      try {
        const response = await fetchFunction(dataFilter);

        if (!Array.isArray(response)) throw new Error(`Invalid response for ${targetData}`);

        targetData.value = applyFilter
          ? response.filter(({ backdrop_path, poster_path, original_title, original_name, title }) => 
              (backdrop_path || poster_path) && (original_title || original_name || title)).slice(0, limit)
          : response.slice(0, limit);
        
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    };

    const fetchDiscoverMovies = async () => {
      const cacheKey = JSON.stringify(discoverFilters.value);
      if (pageCache.value.has(cacheKey)) {
        discoverFilmsData.value = pageCache.value.get(cacheKey);
        return;
      }

      const response = await getDiscoverMovies(discoverFilters.value);
      if (Array.isArray(response)) {
        const filtered = response.filter(({ backdrop_path, poster_path }) => backdrop_path || poster_path).slice(0, 20);
        discoverFilmsData.value = filtered;
        pageCache.value.set(cacheKey, filtered);
      }
    };

    const fetchGenreMovies = () => {
      fetchAPI(getGenreMovies, genreListsData, -1, false);
    }

    const changePage = (newPage) => {
      if (newPage !== discoverFilters.value.page) {
        discoverFilters.value.page = newPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return { 
      getDiscoverMovies, 
      discoverFilmsData,
      getGenreMovies, 
      genreListsData, 
      discoverFilters, 
      fetchDiscoverMovies, 
      fetchGenreMovies, 
      navTop,
      changePage
    };
  }
};
</script>

<style scoped>
</style>