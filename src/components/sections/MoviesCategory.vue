<template>
  <div class="category__inner pb-[30px]">
    <div
      class="category__top"
    >
      <h3 class="category__top-title text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">
        Search movies by category
      </h3>
    </div>
    <div class="category__content flex gap-[45px]">
      <movies-category-list :genreData="genreListsData" @changeGenre="changeGenre"/>
      <div class="category__content-box w-[calc(100%-200px)] mt-[45px]">
        <h4 class="category__content-title font-heading text-[25px] mb-[15px]">Action Films</h4>
        <p class="category__content-desc mb-[55px]">
          Film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful Hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.
        </p>
        <app-slider :title="null" :filmsData="genreFilmsData" :paddingSlider="200"/>
      </div>
    </div>
  </div>
</template>

<script>
import MoviesCategoryList from "../movie/MoviesCategoryList.vue";

import { getGenreMovies, getDiscoverMovies } from "@/services/movieService";
import AppSlider from '../sliders/AppSlider.vue';

export default {
  components: { MoviesCategoryList, AppSlider },

  data() {
    return {
      genreListsData: [],
      genreFilmsData: [],
      currentGenre: 0,
      filtersDiscover: {}
    }
  },
  methods: {
    async fetchMovies(fetchFunction, targetData, limit, applyFilter = true, dataFilter) {
      try {
        const response = await fetchFunction(dataFilter);
        
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
    },
    changeGenre(index) {
      this.filtersDiscover = { with_genres: this.genreListsData[index].id };
      this.fetchMovies(getDiscoverMovies, 'genreFilmsData', 10, false, this.filtersDiscover);
    }
  },
  created() {
    this.fetchMovies(getGenreMovies, 'genreListsData', 7, false);
    this.fetchMovies(getDiscoverMovies, 'genreFilmsData', 10, false, this.filtersDiscover);
  },
};
</script>

<style lang="scss" scoped></style>
