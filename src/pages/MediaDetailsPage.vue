<template>
  <div class="media__details-inner relative">
    <div
      class="media__details-background h-[100vh] bg-cover bg-center bg-no-repeat filter blur-[10px]"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${detailsFilmsData.backdrop_path})`,
      }"
    ></div>
    <div class="media__details-wrapper">
      <div class="page__container">
        <nav-bar :style="{ top: navTop + 'px' }" class="home__view--nav-bar" />
        <div
          class="media__details-box absolute flex gap-[40px] max-w-[1500px] top-0 pt-[100px] left-0 right-0 mx-auto px-[15px]"
        >
          <div class="media__details-poster">
            <img
              class="max-w-[300px] rounded-[10px] shadow-lg"
              :src="'https://image.tmdb.org/t/p/original' + detailsFilmsData.poster_path"
              alt=""
            />
          </div>
          <div class="media__details-desc pt-[20px] w-full">
            <div class="media__details-header flex items-center gap-[10px]">
              <h3 class="media__details-title font-contrast text-4xl font-normal inline">
                {{ detailsFilmsData.title }}
              </h3>
              <span class="media__details-year text-3xl  font-thin"
                >({{ getReleaseYear }})</span
              >
              <a class="media__details-link" :href="'https://www.imdb.com/title/' + detailsFilmsData.imdb_id" target="_blank">
                <svg
                  class="media__details-imdb pl-[10px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  version="1.1"
                >
                  <g fill="#F5C518">
                    <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                  </g>
                  <g
                    transform="translate(8.000000, 7.000000)"
                    fill="#000000"
                    fill-rule="nonzero"
                  >
                    <polygon points="0 18 5 18 5 0 0 0"></polygon>
                    <path
                      d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"
                    ></path>
                    <path
                      d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"
                    ></path>
                    <path
                      d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
            <div class="media__details-meta flex items-center gap-[10px]">
              <p
                class="media__details-age border border-white/60 text-white/60 inline py-[2px] px-[5px] rounded-[2px]"
              >
                {{ detailsFilmsData.adult ? "18+" : "Age Free" }}
              </p>
              <p class="media__details-release inline">
                {{ detailsFilmsData.release_date }}
              </p>
              <ul class="media__details-list-genre flex gap-[8px] items-center">
                <span
                  class="media__details-list-circle w-[5px] h-[5px] bg-white rounded-full"
                ></span>
                <li
                  class="media__details-list-item"
                  v-for="(item, index) in detailsFilmsData.genres"
                  :key="index"
                >
                  <p class="media__details-genre inline]">
                    {{ item.name
                    }}{{ detailsFilmsData.genres.length > index + 1 ? "," : "" }}
                  </p>
                </li>
                <span
                  class="media__details-list-circle w-[5px] h-[5px] bg-white rounded-full"
                ></span>
              </ul>
              <div class="media__details-duration">
                {{ getDurationMedia }}
              </div>
            </div>
            <div class="media__details-main">
              <div class="media-details-rating">
                <star-rating
                  :star-size="20"
                  :rating="detailsFilmsData.vote_average / 2"
                  :increment="0.01"
                  :read-only="true"
                  :glow="10"
                  glow-color="#ffd055"
                  :show-rating="false"
                />
              </div>
              <div 
                v-if="detailsFilmsData.budget"
                class="media-details-budget text-[13px] mt-[10px]"
              >
                💰Budget: {{  (detailsFilmsData.budget / 1_000_000).toFixed(2) }} Mln $
              </div>
              <div 
                v-if="detailsFilmsData.revenue"
                class="media-details-budget text-[13px] mt-[10px]"
              >
                📈Revenue: {{ (detailsFilmsData.revenue / 1_000_000).toFixed(2) }} Mln $
              </div>
              <div
                class="media-details-tagline mt-[30px] font-normal italic opacity-70 underline"
              >
                {{ detailsFilmsData.tagline }}
              </div>

              <div class="media-details-overview mt-[10px] max-w-[800px]">
                <span class="block font-bold mb-[5px]">Overview</span>
                {{ detailsFilmsData.overview }}
              </div>
            </div>
          </div>
        </div>
        <home-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/sections/NavBar.vue";
import HomeFooter from "@/components/sections/HomeFooter.vue";
import { getDetailsMovies } from "@/services/movieService";
import StarRating from "vue-star-rating";

export default {
  components: { NavBar, HomeFooter, StarRating },
  setup() {
    const route = useRoute();
    const detailsFilmsData = ref({});

    const movieId = route.params.id;

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

    const getReleaseYear = computed(() => {
      return detailsFilmsData.value.release_date
        ? detailsFilmsData.value.release_date.split("-")[0]
        : "In release";
    });

    const getDurationMedia = computed(() => {
      const runtime = detailsFilmsData.value.runtime;
      if (!runtime) return "-";
      return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    });

    const fetchAPI = async (fetchFunction, targetData) => {
      try {
        const response = await fetchFunction(movieId);

        targetData.value = response;
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    };

    fetchAPI(getDetailsMovies, detailsFilmsData);

    return {
      detailsFilmsData,
      navTop,
      getReleaseYear,
      getDurationMedia,
    };
  },
};
</script>

<style scoped></style>
