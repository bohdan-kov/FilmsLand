<template>
  <div class="home__view-inner page__container">
    <nav-bar />
    <release-slider :filmsData="releaseFilmsData" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ReleaseSlider from '@/components/Sliders/ReleaseSlider.vue';
import { getUpcomingMovies } from '@/services/movieService'


export default {
  components: { NavBar, ReleaseSlider },
  data() {
    return {
      releaseFilmsData: [],
    }
  },
  computed: {

  },
  methods: {
    async fetchRealease() {
      try {
        const response = await getUpcomingMovies();
        console.log(response);

        const filmsFiltered = response.filter(item => item.backdrop_path && item.original_title && item.overview && item.release_date)

        this.releaseFilmsData = filmsFiltered.splice(0, 10)
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchRealease()
  },
}
</script>

<style lang="scss" scoped></style>