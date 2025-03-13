<template>
  <div class="home__view-inner page__container">
    <nav-bar />

    <release-slider />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ReleaseSlider from '@/components/Sliders/ReleaseSlider.vue';
  export default {
  components: { NavBar, ReleaseSlider },
    
  }
</script>

<style lang="scss" scoped>

</style>