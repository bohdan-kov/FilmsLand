<template>
  <div class="media-listCard__inner flex flex-wrap gap-[32px]">
    <div 
      v-for="(media, index) in mediaDate"
      class="media-listCard__item"
      :key="index"
    >
      <media-card :item="media"/>
    </div>
    <div 
      class="media-listCard__no-data pt-[10px]"
      v-if="!mediaDate.length"
    >
    Nothing was found for your search.
    </div>
  </div>
</template>

<script>
import MediaCard from './MediaCard.vue'
  export default {
  components: { MediaCard },
    props: {
      mediaDate: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>