<template>
  <div class="filters-dropdown__item-rating px-[7px] pb-[20px]">
    <VueSlider 
      v-model="rangeLocal"
      @change="(v, i) => $emit('onRangeSelected', v, i)"
      :min="minValue"
      :max="maxValue"
      :interval="intervalValue"
      marks 
    />
  </div>
</template>

<script>
import VueSlider from 'vue-3-slider-component'

export default {
  components: {
    VueSlider
  },
  emits: ['onRangeSelected'],
  props: {
    rangeValues: {
      type: Array
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 10
    },
    intervalValue: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      rangeLocal: JSON.parse(JSON.stringify(this.rangeValues))
    }
  },
}
</script>

<style scoped>
.slider {
  /* overwrite slider styles */
  width: 200px;
}
</style>
