<template>
  <div class="popular__films-inner page__container">
    <nav-bar />
    {{ movies }}
  </div>
</template>

<script>
import NavBar from '@/components/sections/NavBar.vue'
import { getPopularMovies } from '@/services/movieService';


export default {
  components: { NavBar },
  data() {
    return {
      movies: [],
      loading: false,
      error: null
    };
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      this.error = null;
      try {
        this.movies = await getPopularMovies();
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchMovies()
  },
}
</script>

<style lang="scss" scoped></style>