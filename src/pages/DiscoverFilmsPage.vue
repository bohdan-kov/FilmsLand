<template>
  <div class="discover__films-inner">
    <div class="discover__films-wrapper pt-[60px]">
      <div class="page__container mb-[50px] min-h-screen">
        <nav-bar :style="{ top: navTop + 'px' }" class="discover__films--nav-bar" />

        <h2
          class="mt-[50px] text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]"
        >
          Discover Films
        </h2>
        <!-- {{ discoverFilters }} {{ totalPages }} -->
        <!-- <button @click="fetchDiscoverMovies">Fetch</button> -->

        <div class="discover__films-box flex gap-[30px]">
          <div
            class="discover__films-filters min-w-[260px] max-w-[260px] flex flex-col gap-3"
          >
            <sort-dropdown v-model="discoverFilters.sort_by" />
            <filters-dropdown
              v-model="discoverFilters"
              :genreListsData="genreListsData"
            />
          </div>
          <div class="discover__films-content relative w-full">
            <media-list-card v-if="!pageLoading" :mediaDate="discoverFilmsData" />
            <svg
              v-else
              class="discover__films-content--loading absolute left-0 right-0 top-[50%] transform -translate-y-1/2 my-0 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="50"
              height="50"
              style="shape-rendering: auto; display: block; background: transparent"
            >
              <g>
                <circle
                  stroke-dasharray="164.93361431346415 56.97787143782138"
                  r="35"
                  stroke-width="10"
                  stroke="#053ba9"
                  fill="none"
                  cy="50"
                  cx="50"
                >
                  <animateTransform
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                    dur="1.3333333333333333s"
                    repeatCount="indefinite"
                    type="rotate"
                    attributeName="transform"
                  />
                </circle>
                <g />
              </g>
            </svg>
          </div>
        </div>

        <div class="pagination mt-8 flex justify-center items-center gap-4">
          <pagination-nav
            :totalPages="totalPages"
            :currentPage="discoverFilters.page"
            @onChangePage="onChangePage"
          />
        </div>
        <home-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import NavBar from "@/components/sections/NavBar.vue";
import HomeFooter from "@/components/sections/HomeFooter.vue";
import { getGenreMovies, getDiscoverMovies } from "@/services/movieService";
import SortDropdown from "@/components/filter-panel/SortDropdown.vue";
import FiltersDropdown from "@/components/filter-panel/FiltersDropdown.vue";
import MediaListCard from "@/components/cards/MediaListCard.vue";
import PaginationNav from "@/components/UI/paginationNav.vue";

export default {
  components: {
    NavBar,
    HomeFooter,
    SortDropdown,
    FiltersDropdown,
    MediaListCard,
    PaginationNav,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const discoverFilmsData = ref([]);
    const genreListsData = ref([]);
    const pageLoading = ref(true);

    const pageCache = ref(new Map());
    const totalPages = ref(1);

    const discoverFilters = ref({
      sort_by: "popularity.desc",
      page: parseInt(route.query.page) || 1,
      "release_date.gte": "",
      "release_date.lte": "",
      with_genres: "",
      "vote_average.gte": "",
      "vote_average.lte": "",
      "vote_count.gte": "",
    });

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
      // fetchDiscoverMovies();
      fetchGenreMovies();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    watch(
      () => discoverFilters.value.page,
      (newPage) => {
        router.push({
          path: "/discover-films",
          query: { ...route.query, page: newPage },
        });
      }
    );

    watch(
      discoverFilters,
      () => {
        fetchDiscoverMovies();
      },
      { deep: true }
    );

    const fetchAPI = async (
      fetchFunction,
      targetData,
      limit,
      applyFilter = true,
      dataFilter
    ) => {
      try {
        const response = await fetchFunction(dataFilter);

        if (!Array.isArray(response))
          throw new Error(`Invalid response for ${targetData}`);

        targetData.value = applyFilter
          ? response
              .filter(
                ({ backdrop_path, poster_path, original_title, original_name, title }) =>
                  (backdrop_path || poster_path) &&
                  (original_title || original_name || title)
              )
              .slice(0, limit)
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

      const { response, total_pages } = await getDiscoverMovies(discoverFilters.value);

      totalPages.value = total_pages < 500 ? total_pages : 500;

      if (Array.isArray(response)) {
        const filtered = response
          .filter(({ backdrop_path, poster_path }) => backdrop_path || poster_path)
          .slice(0, 20);
        discoverFilmsData.value = filtered;
        pageCache.value.set(cacheKey, filtered);
        pageLoading.value = false;
      }
    };

    const fetchGenreMovies = () => {
      fetchAPI(getGenreMovies, genreListsData, -1, false);
    };

    const onChangePage = (newPage) => {
      if (newPage !== discoverFilters.value.page) {
        discoverFilters.value.page = newPage;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
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
      totalPages,
      onChangePage,
      pageLoading,
    };
  },
};
</script>

<style scoped></style>
