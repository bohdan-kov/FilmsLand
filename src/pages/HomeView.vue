<template>
  <div class="home__view-inner page__container">
    <nav-bar />
    <release-slider :filmsData="releaseFilmsData" />
    <app-slider
      title="The Most Trending Now"
      :filmsData="trendingFilmsData"
    />
    <app-slider
      title="Popular Films"
      :filmsData="popularFilmsData"
    />


  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ReleaseSlider from '@/components/Sliders/ReleaseSlider.vue';
import AppSlider from '@/components/Sliders/AppSlider.vue';
import { getUpcomingMovies, getNowPlayingMovies, getPopularMovies, getTrendingMovies } from '@/services/movieService'


export default {
  components: { NavBar, ReleaseSlider, AppSlider },
  data() {
    return {
      releaseFilmsData: [],
      trendingFilmsData: [],
      popularFilmsData: []
    }
  },
  computed: {

  },
  methods: {
    async fetchRelease() {
      try {
        const response = await getUpcomingMovies();
        const filmsFiltered = response.filter(item => item.backdrop_path && item.original_title && item.overview && item.release_date)

        this.releaseFilmsData = filmsFiltered.splice(0, 10)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrending() {
      try {
        const response = await getTrendingMovies();
        const filmsFiltered = response.filter(item => item.backdrop_path && item.original_title && item.overview && item.release_date)

        this.trendingFilmsData = filmsFiltered.splice(0, 15)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNowPlaying() {
      try {
        const response = await getNowPlayingMovies();
        const filmsFiltered = response.filter(item => item.backdrop_path && item.original_title && item.overview && item.release_date)

        this.trendingFilmsData = filmsFiltered.splice(0, 15)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPopular() {
      try {
        const response = await getPopularMovies();
        const filmsFiltered = response.filter(item => item.backdrop_path && item.original_title && item.overview && item.release_date)

        this.popularFilmsData = filmsFiltered.splice(0, 15)

      } catch (error) {
        console.error(error);
        
      }
    }
  },
  created() {
    this.fetchRelease();
    this.fetchTrending();
    this.fetchPopular()
  },
}
</script>

<style lang="scss" scoped></style>