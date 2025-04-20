<template>
  <div class="pagination-nav__box flex gap-[10px]">
    <!-- {{ currentPage }} -->
    <!-- {{ totalPages }} -->
    <button
      class="pagination-nav__first pagination-nav__btn border border-[rgb(41,37,36)] disabled:opacity-50 rounded-[5px] w-[36px] h-[36px] flex justify-center items-center"
      :disabled="currentPage === 1"
      @click="$emit('onChangePage', 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevrons-left-icon"
      >
        <path d="m11 17-5-5 5-5"></path>
        <path d="m18 17-5-5 5-5"></path>
      </svg>
    </button>
    <button
      class="pagination-nav__prev pagination-nav__btn border border-[rgb(41,37,36)] disabled:opacity-50 rounded-[5px] w-[36px] h-[36px] flex justify-center items-center"
      :disabled="currentPage === 1"
      @click="$emit('onChangePage', currentPage - 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-left-icon"
      >
        <path d="m15 18-6-6 6-6"></path>
      </svg>
    </button>

    <ul class="pagination-nav__list flex gap-[10px]">
      <div v-if="currentPage >= 5" class="flex gap-[10px]">
        <button
          class="pagination-nav__btn border border-[rgb(41,37,36)] rounded-[5px] w-[36px] h-[36px]"
          @click="$emit('onChangePage', 1)"
        >
          1
        </button>
        <div
          class="w-9 h-9 flex items-center justify-center"
          index="1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>
      <li
        class="pagination-nav__item"
        v-for="(item, index) in calcPaginationList"
        :key="index"
      >
        <button
          :class="{ 'pagination-nav__btn--active !bg-[#053ba3]': currentPage === item }"
          class="pagination-nav__btn border border-[rgb(41,37,36)] rounded-[5px] w-[36px] h-[36px]"
          @click="$emit('onChangePage', item)"
        >
          {{ item }}
        </button>
      </li>
      <div v-if="(totalPages - currentPage) > 3" class="flex gap-[10px]">
        <div class="w-9 h-9 flex items-center justify-center" index="1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
        <button
          class="pagination-nav__btn border border-[rgb(41,37,36)] rounded-[5px] w-[36px] h-[36px]"
          @click="$emit('onChangePage', totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>
    </ul>

    <button
      class="pagination-nav__next pagination-nav__btn border border-[rgb(41,37,36)] disabled:opacity-50 rounded-[5px] w-[36px] h-[36px] flex justify-center items-center"
      :disabled="currentPage === totalPages"
      @click="$emit('onChangePage', currentPage + 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-right-icon"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </button>

    <button
      class="pagination-nav__first pagination-nav__btn border border-[rgb(41,37,36)] disabled:opacity-50 rounded-[5px] w-[36px] h-[36px] flex justify-center items-center"
      :disabled="currentPage === totalPages"
      @click="$emit('onChangePage', totalPages)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevrons-right-icon"
      >
        <path d="m6 17 5-5-5-5"></path>
        <path d="m13 17 5-5-5-5"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    calcPaginationList() {
      let start = 1;
      let length = 5;

      if (this.currentPage < 5) {
        start = 1;
      } else if (this.totalPages - this.currentPage <= 3) {
        start = this.totalPages - 4;
      } else {
        start = this.currentPage - 1;
        length = 3;
      }

      start = Math.max(start, 1);

      return Array.from({ length }, (_, i) => start + i).filter(item => item <= this.totalPages);
  } ,
  },
};
</script>

<style lang="scss" scoped></style>
