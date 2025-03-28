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
        <div class="app__slider-item relative h-[380px] w-[265px] rounded-[10px] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
          <div class="app__slider-desc absolute pt-[7px] pr-[12px] pb-[18px] pl-[4px] w-full min-h-[20%] bottom-0 bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px] opacity-0">
            <div class="app__slider-top flex items-start justify-between">
              <h3 class="app__slider-title font-contrast text-[25px] font-normal">{{ item.original_title || item.original_name }}</h3>
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
          <div class="app__slider-rating absolute top-[10px] left-[10px] flex gap-[10px] items-center bg-[rgba(16,16,16,0.50)] backdrop-blur-[2px] rounded-[10px] p-[3px]">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--star-inline" viewBox="0 0 24 24" fill="#f5c518" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
            {{ ratingRounding(item.vote_average) }}
          </div>
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
  methods: {
    getYearItem(item) {
      return item?.release_date ? item.release_date.split('-')[0] : 'In release';
    },
    ratingRounding(num) {
      return num.toFixed(1);
    }
  }
};
</script>

<style scoped>
@keyframes scale-in-ver-bottom {
  0% {
    transform: scaleY(0);
    transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
    opacity: 1;
  }
}

.swiper-slide-active .app__slider-desc,
.app__slider-item:hover .app__slider-desc {
  animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
</style>