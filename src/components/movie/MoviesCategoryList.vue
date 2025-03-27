<template>
  <ul class="movies__category-list max-w-[150px]">
    <li 
      v-for="(genre, index) in genreData"
      :key="index"
      @click="chooseGenre(index)"
      class="movies__category-item font-heading text-[20px] font-medium pt-[10px] pr-[68px] pb-[8px] pl-[16px] mb-[6px] cursor-pointer"
      :class="{'bg-gradient-to-r from-[#053BA3] to-[rgba(5,59,163,0.22)] cursor-default': currentGenre === index}"
    >
      {{ genre.name }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      genreData: {
        type: Object
      }
    },
    data() {
      return {
        currentGenre: 0
      }
    },
    methods: {
      chooseGenre(index){
        this.currentGenre = index
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>