<template>
  <div
    class="media__card-item relative h-[380px] w-[265px] rounded-[10px] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
  >
    <div
      class="media__card-desc absolute pt-[7px] pr-[12px] pb-[18px] pl-[4px] w-full min-h-[20%] bottom-0 bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px] opacity-0"
    >
      <div class="media__card-top flex items-start justify-between">
        <h3 class="media__card-title font-contrast text-[25px] font-normal">
          {{ item.original_title || item.original_name }}
        </h3>
        <button-like />
      </div>
      <div class="media__card-date">
        {{ getYearItem(item) }}
      </div>
      <button-info class="float-right" />
    </div>
    <img
      v-if="item.poster_path"
      class="media__card-img w-full h-full object-cover rounded-[10px]"
      :src="'https://image.tmdb.org/t/p/original' + item.poster_path"
      alt=""
    />
    <img
      v-else
      class="media__card-img w-full h-full object-cover rounded-[10px]"
      :src="'https://image.tmdb.org/t/p/original' + item.backdrop_path"
      alt=""
    />
    <div
      class="media__card-rating absolute top-[10px] left-[10px] flex gap-[10px] items-center bg-[rgba(16,16,16,0.50)] backdrop-blur-[2px] rounded-[10px] p-[3px]"
    >
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        class="ipc-icon ipc-icon--star-inline"
        viewBox="0 0 24 24"
        fill="#f5c518"
        role="presentation"
      >
        <path
          d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
        ></path>
      </svg>
      {{ ratingRounding(item.vote_average) }}
    </div>
  </div>
</template>

<script>
import buttonInfo from '../UI/buttonInfo.vue';
import buttonLike from '../UI/buttonLike.vue';

export default {
  components: {
    buttonInfo,
    buttonLike,
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    getYearItem(item) {
      return item?.release_date ? item.release_date.split('-')[0] : 'In release';
    },
    ratingRounding(num) {
      return num ? num.toFixed(1) : '-';
    }
  },
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

.swiper-slide-active .media__card-desc,
.media__card-item:hover .media__card-desc {
  animation: scale-in-ver-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
</style>
