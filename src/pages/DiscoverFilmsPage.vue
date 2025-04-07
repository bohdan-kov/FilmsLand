<template>
  <div class="discover__films-inner">
    <div class="discover__films-wrapper pt-[60px]">
      <div class="page__container mb-[50px] min-h-screen">
        <nav-bar :style="{ top: navTop + 'px' }" class="discover__films--nav-bar" />

        <h2 class="mt-[50px] text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">Discover Films</h2>
        {{ discoverFilters }}
        <button @click="fetchDiscoverMovies">Fetch</button>

        <div class="discover__films-box flex gap-[30px]">
          <div class="discover__films-filters min-w-[260px] flex flex-col gap-3">
            <sort-dropdown v-model="discoverFilters.sort_by"/>
            <filters-dropdown/>
          </div>
          <div class="discover__films-content">
            <media-list-card :mediaDate="discoverFilmsData"/>
          </div>
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
import NavBar from '@/components/sections/NavBar.vue';
import HomeFooter from '@/components/sections/HomeFooter.vue';
import { getDiscoverMovies } from '@/services/movieService';
import SortDropdown from '@/components/filter-panel/SortDropdown.vue';
import FiltersDropdown from '@/components/filter-panel/FiltersDropdown.vue';
import MediaListCard from '@/components/cards/MediaListCard.vue';


export default {
  components: { NavBar, HomeFooter, SortDropdown, FiltersDropdown, MediaListCard, },
  setup() {
    const discoverFilmsData = ref([]);
    const discoverFilters = ref({
      sort_by: 'popularity.desc',
      page: 1,
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
      fetchDiscoverMovies()
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    watch(
      () => discoverFilters.value,
      (newValue, oldValue) => {
        console.log("Filters changed:", newValue, oldValue);
        fetchDiscoverMovies();
      },
      {deep: true}
    );

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

    const fetchDiscoverMovies = () => {
      fetchAPI(getDiscoverMovies, discoverFilmsData, 20, true, discoverFilters.value);
    }


    return { getDiscoverMovies, discoverFilmsData, discoverFilters, fetchDiscoverMovies, navTop };
  }
};
</script>

<style scoped>
</style>