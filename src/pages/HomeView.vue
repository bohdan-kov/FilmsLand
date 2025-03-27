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
  </div>
</template>

<script>
import NavBar from '@/components/sections/NavBar.vue';
import ReleaseSlider from '@/components/sliders/ReleaseSlider.vue';
import MoviesCategory from '@/components/sections/MoviesCategory.vue';
import AppSlider from '@/components/sliders/AppSlider.vue';
import { getUpcomingMovies, getNowPlayingMovies, getPopularMovies, getTrendingMovies } from '@/services/movieService';

export default {
  components: { NavBar, ReleaseSlider, AppSlider, MoviesCategory },
  data() {
    return {
      releaseFilmsData: [],
      trendingFilmsData: [],
      nowPlayingFilmsData: [],
      popularFilmsData: [],
    };
  },
  methods: {
    async fetchMovies(fetchFunction, targetData, limit, applyFilter = true) {
      try {
        const response = await fetchFunction();
        
        if (!Array.isArray(response)) {
          throw new Error(`Invalid response for ${targetData}`);
        }
        
        this[targetData] = applyFilter
          ? response.filter(({ backdrop_path, original_title, overview, release_date }) => 
              backdrop_path && original_title && overview && release_date).slice(0, limit)
          : response.slice(0, limit);
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    }
  },
  created() {
    this.fetchMovies(getUpcomingMovies, 'releaseFilmsData', 10);
    this.fetchMovies(getTrendingMovies, 'trendingFilmsData', 15);
    this.fetchMovies(getNowPlayingMovies, 'nowPlayingFilmsData', 15);
    this.fetchMovies(getPopularMovies, 'popularFilmsData', 15);
  }
};
</script>

<style lang="scss" scoped></style>