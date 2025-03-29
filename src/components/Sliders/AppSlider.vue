<template>
  <div class="app__content mb-[102px]">
    <div class="app__content-top" v-if="title">
      <h3 class="app__content-title text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">{{ title }}</h3>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="getSlidesPerView"
      :space-between="20"
      :loop="false"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ el: '.swiper-steps', clickable: true }"
      :scrollbar="{ draggable: true }"
      class="app__slider-inner"
    >
      <!-- :autoplay="{delay: 3000, disableOnInteraction: false}" -->
      <swiper-slide v-for="(item, index) in filmsData" :key="index">
        <media-card :item="item"/>
      </swiper-slide>

      <div class="swiper-steps mt-[30px]"></div>

      <div class="swiper-button-next !w-[40px] !h-[40px]">
        <button-next/>
      </div>
      <div class="swiper-button-prev !w-[40px] !h-[40px]">
        <button-prev/>
      </div>
    </swiper>
  </div>
</template>

<script>
import { computed } from "vue";
import buttonPrev from "@/components/UI/buttonPrev";
import buttonNext from "@/components/UI/buttonNext";
import MediaCard from "@/components/cards/MediaCard.vue"

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonPrev,
    buttonNext,
    MediaCard
  },
  props: {
    filmsData: {
      type: Array,
    },
    title: {
      type: String
    },
    paddingSlider: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  setup(props) {
    const getSlidesPerView = computed(() => {
      const width =  window.innerWidth - props.paddingSlider;
      return width > 1500 ? 5 : width > 1150 ? 4 : width > 850 ? 3 : width > 570 ? 2 : 1;
    });
    return {
      getSlidesPerView,
      modules: [Navigation, Pagination, Scrollbar, Autoplay, A11y],
    };
  },
};
</script>

<style scoped>

</style>