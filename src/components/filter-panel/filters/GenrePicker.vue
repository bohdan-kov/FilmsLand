<template>
  <div class="filters-dropdown__item-genre">
    <ul class="filters-dropdown__item-genre-list flex flex-wrap gap-[10px]">
      <li 
        v-for="(item) in genreLists" 
        class="filters-dropdown__item-genre-item bg-black/30 text-white rounded-[10px] px-[10px] py-[5px] text-[13px] select-none cursor-pointer"
        :class="{'!bg-[#053ba3]': modelValue.split(',').includes(String(item.id))}"
        :key="item.id"
        @click="genreSelected(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      genreLists: {
        type: Array
      },
      modelValue: {
        type: String
      }
    },
    methods: {
      genreSelected(id){
        this.$emit('onGenreSelected', id)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>