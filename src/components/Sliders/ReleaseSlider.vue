<template>
  <swiper
    :slides-per-view="getSlidesPerView"
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    class="release__slider-inner"
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
          <div class="release__slider-action absolute bottom-[23px]">
            <button-info/>
          </div>
        </div>
        <img
          class="release__slider-img rounded-[10px]"
          :src="'https://image.tmdb.org/t/p/original' + item.backdrop_path"
          alt="no-img"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import buttonInfo from "@/components/UI/buttonInfo"
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonInfo
  },
  props: {
    filmsData: {
      type: Array,
    },
  },
  computed: {
    getSlidesPerView() {
      return window.innerWidth > 768 ? 2 : 1;
    },
  },
};
</script>

<style scoped>
</style>
