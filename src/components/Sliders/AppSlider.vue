<template>
  <div class="app__content mb-[102px]">
    <div class="app__content-top">
      <h3 class="app__content-title text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">{{ title }}</h3>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="5"
      :space-between="20"
      :loop="false"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ el: '.swiper-steps', clickable: true }"
      :scrollbar="{ draggable: true }"
      class="app__slider-inner"
    >
      <!-- :autoplay="{delay: 3000, disableOnInteraction: false}" -->
      <swiper-slide v-for="(item, index) in filmsData" :key="index">
        <div class="app__slider-item relative h-[380px] w-[265px] rounded-[10px]">
          <div class="app__slider-desc absolute pt-[7px] pr-[12px] pb-[18px] pl-[4px] w-full min-h-[20%] bottom-0 bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px] opacity-0">
            <div class="app__slider-top flex items-start justify-between">
              <h3 class="app__slider-title font-contrast text-[25px] font-normal">{{ item.original_title }}</h3>
              <button-like/>
            </div>
            <div class="app__slider-date">
              {{ getYearItem(item) }}
            </div>
            <button-info class="float-right"/>
          </div>
          <img 
            class="app__slider-img w-full h-full object-cover rounded-[10px]"
            :src="'https://image.tmdb.org/t/p/original' + item.backdrop_path"
            alt=""
          >
        </div>
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

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import buttonInfo from '../UI/buttonInfo.vue';
import buttonLike from '../UI/buttonLike.vue';
import buttonPrev from "@/components/UI/buttonPrev";
import buttonNext from "@/components/UI/buttonNext";

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
    title: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  setup() {
    const getSlidesPerView = computed(() => {
      return window.innerWidth > 768 ? 2 : 1;
    });

    return {
      getSlidesPerView,
      modules: [Navigation, Pagination, Scrollbar, Autoplay, A11y],
    };
  },
  methods: {
    getYearItem(item){
      if (!item?.release_date){
        return 'In release'
      }
      return item.release_date.split('-')[0]
    }
  },
};
</script>

<style scoped>
 @-webkit-keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}
@keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}

.swiper-slide-active .app__slider-desc {
	-webkit-animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}

.app__slider-item:hover .app__slider-desc{
	-webkit-animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}


</style>
