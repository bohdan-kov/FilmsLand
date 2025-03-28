<template>
  <div class="home__view-inner page__container">
    <nav-bar />
    <release-slider :filmsData="releaseFilmsData" />
    <app-slider 
      title="The Most Trending Now"
      :filmsData="trendingFilmsData" />
    <app-slider
      title="Popular Films"
      :filmsData="popularFilmsData"
    />
    <movies-category/>
    <app-slider
      title="Popular TV series"
      :filmsData="popularSeriesData"
    />

    <watch-everywhere/>
  </div>
</template>

<script>
import NavBar from '@/components/sections/NavBar.vue';
import ReleaseSlider from '@/components/sliders/ReleaseSlider.vue';
import MoviesCategory from '@/components/sections/MoviesCategory.vue';
import WatchEverywhere from '@/components/sections/WatchEverywhere.vue';
import AppSlider from '@/components/sliders/AppSlider.vue';


import { getUpcomingMovies, getPopularMovies, getPopularSeries, getTrendingMovies } from '@/services/movieService'; //getNowPlayingMovies

export default {
  components: { NavBar, ReleaseSlider, AppSlider, MoviesCategory, WatchEverywhere  },
  data() {
    return {
      releaseFilmsData: [],
      trendingFilmsData: [],
      popularFilmsData: [],
      popularSeriesData: []
    };
  },
  methods: {
    async fetchAPI(fetchFunction, targetData, limit, applyFilter = true) {
      try {
        const response = await fetchFunction();
        
        if (!Array.isArray(response)) {
          throw new Error(`Invalid response for ${targetData}`);
        }
        
        this[targetData] = applyFilter
          ? response.filter(({ backdrop_path, original_title, original_name, overview }) => 
              backdrop_path && (original_title || original_name) && overview).slice(0, limit)
          : response.slice(0, limit);
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    }
  },
  created() {
    this.fetchAPI(getUpcomingMovies, 'releaseFilmsData', 10);
    this.fetchAPI(getTrendingMovies, 'trendingFilmsData', 15);
    this.fetchAPI(getPopularMovies, 'popularFilmsData', 15);
    this.fetchAPI(getPopularSeries, 'popularSeriesData', 15)
  }
};
</script>

<style lang="scss" scoped></style>