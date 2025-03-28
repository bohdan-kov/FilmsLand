<template>
  <ul class="movies__category-list max-w-[150px]">
    <li 
      v-for="(genre, index) in genreData"
      :key="index"
      @click="changeGenre(index)"
      class="movies__category-item font-heading text-[20px] font-medium pt-[10px] pr-[68px] pb-[8px] pl-[16px] mb-[6px] cursor-pointer transform origin-left"
      :class="{'movies__category-item--active bg-gradient-to-r from-[#053BA3] to-[rgba(5,59,163,0.22)] cursor-default animate-[highlight_0.5s_ease-in-out]': currentGenre === index}"
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
      changeGenre(index){
        this.currentGenre = index
        this.$emit('changeGenre', index)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>