<template>
  <swiper
    :modules="modules"
    :slides-per-view="getSlidesPerView"
    :space-between="20"
    :loop="false"
    :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
    :pagination="false"
    :scrollbar="{ draggable: true }"
    :autoplay="{delay: 3000, disableOnInteraction: false}"
    class="release__slider-inner mb-[78px] mt-[20px]"
  >
    <swiper-slide v-for="(item, index) in filmsData" :key="index">
      <div class="release__slider-item relative rounded-[10px]">
        <div class="release__slider-desc absolute right-0 w-[35%] h-full p-[21px_16px_23px_14px] rounded-r-[10px] bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px]">
          <h2 class="release__slider-title truncate font-contrast text-[30px]">
            {{ item.original_title }}
          </h2>
          <div class="mb-[15px] truncate">
            Date Release: {{ item.release_date }}
          </div>
          <div class="overflow-hidden text-ellipsis max-h-[45%]">
            {{ item.overview }}
          </div>
          <div class="release__slider-action flex gap-[6px] absolute bottom-[23px]">
            <button-info/>
            <button-like class="bg-[#053BA3]"/>
          </div>
        </div>
        <img
          class="release__slider-img rounded-[10px]"
          :src="'https://image.tmdb.org/t/p/original' + item.backdrop_path"
          alt="no-img"
        />
      </div>
    </swiper-slide>

    <div class="swiper-button-next !w-[40px] !h-[40px]">
      <button-next/>
    </div>
    <div class="swiper-button-prev !w-[40px] !h-[40px]">
      <button-prev/>
    </div>
  </swiper>
</template>

<script>
import { computed } from "vue";

import buttonInfo from "@/components/UI/buttonInfo";
import buttonLike from "@/components/UI/buttonLike";
import buttonPrev from "@/components/UI/buttonPrev";
import buttonNext from "@/components/UI/buttonNext";

// import Swiper core and required modules
import { Navigation, Scrollbar, Autoplay, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonInfo,
    buttonLike,
    buttonPrev,
    buttonNext
  },
  props: {
    filmsData: {
      type: Array,
    },
  },
  setup() {
    const getSlidesPerView = computed(() => {
      return window.innerWidth > 768 ? 2 : 1;
    });

    return {
      getSlidesPerView,
      modules: [Navigation, Scrollbar, Autoplay, A11y],
    };
  },
};
</script>

<style scoped>
</style>
