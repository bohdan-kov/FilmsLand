<template>
  <div class="filters-dropdown__inner">
    <div
      @click="toggleFilter"
      class="filters-dropdown__name justify-between w-full px-[16px] py-[14px] flex items-center rounded-[15px] bg-[#12192C]"
      :class="{ '!rounded-b-[0]': isOpenFilter }"
    >
      <p class="filters-dropdown__name">Filters</p>
      <img
        :class="{ 'rotate-[90deg]': isOpenFilter }"
        src="@/assets/images/icons/arrow-right.svg"
        alt="Toggle filter"
      />
    </div>

    <div v-show="isOpenFilter" class="filters-dropdown__items py-[14px] rounded-b-[15px] bg-[#1C2331]">
      <div class="filters-dropdown__item px-[16px] py-[14px] border-b-[2px] border-[#12192C]">
        <h6 class="filters-dropdown__item-title mb-[10px] font-normal">Release date</h6>
        <DatePicker
          v-model="localFilters['release_date.gte']"
          @onDateSelected="dateSelected"
          :isOpenCalendar="isOpenCalendar['release_date.gte']"
          @openCalendar="toggleCalendar('release_date.gte')"
          v-click-outside="() => closeCalendar('release_date.gte')"
          label="from"
          field="release_date.gte"
        />
        <DatePicker
          v-model="localFilters['release_date.lte']"
          @onDateSelected="dateSelected"
          :isOpenCalendar="isOpenCalendar['release_date.lte']"
          @openCalendar="toggleCalendar('release_date.lte')"
          v-click-outside="() => closeCalendar('release_date.lte')"
          label="to"
          field="release_date.lte"
        />
      </div>
      <div class="filters-dropdown__item px-[16px] py-[14px] border-b-[2px] border-[#12192C]">
        <h6 class="filters-dropdown__item-title mb-[10px] font-normal">Genre</h6>
        <GenrePicker 
          v-model="localFilters['with_genres']"
          :genreLists="genreListsData"
          @onGenreSelected="genreSelected"
        />
      </div>
      <div class="filters-dropdown__item px-[16px] py-[14px] border-b-[2px] border-[#12192C]">
        <h6 class="filters-dropdown__item-title mb-[10px] font-normal">Movie rating</h6>
        <RangePicker
          @onRangeSelected="ratingSelected"
          :rangeValues="ratingRange"
        />
      </div>
      <div class="filters-dropdown__item px-[16px] py-[14px] border-b-[2px] border-[#12192C]">
        <h6 class="filters-dropdown__item-title mb-[10px] font-normal">Minimum number of votes</h6>
        <RangePicker
          @onRangeSelected="votesSelected"
          :rangeValues="votesRange"
          :maxValue="500"
          :intervalValue="100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import clickOutside from "@/directives/v-click-outside.js";
import DatePicker from './filters/DatePicker.vue';
import GenrePicker from "./filters/GenrePicker.vue";
import RangePicker from "./filters/RangePicker.vue";

export default {
  components: { DatePicker, GenrePicker, RangePicker },
  directives: { clickOutside },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    genreListsData: {
      type: Array,
    }
  },
  data() {
    return {
      isOpenFilter: true,
      isOpenCalendar: {
        'release_date.gte': false,
        'release_date.lte': false
      },
      ratingRange: [0, 10],
      votesRange: [0],
      localFilters: JSON.parse(JSON.stringify(this.modelValue)),
    };
  },
  created() {
    this.setCurrentDate();
  },
  watch: {
    localFilters: {
      deep: true,
      handler(newValue){
        this.$emit("update:modelValue", newValue)
      }
    }
  },
  methods: {
    toggleFilter() {
      this.isOpenFilter = !this.isOpenFilter;
    },
    toggleCalendar(type) {
      this.isOpenCalendar[type] = !this.isOpenCalendar[type];
    },
    closeCalendar(type) {
      this.isOpenCalendar[type] = false;
    },
    dateSelected(date, type) {
      this.localFilters[type] = date;
      this.closeCalendar(type);
    },
    setCurrentDate() {
      const [day, month, year] = new Date().toLocaleDateString().split('.');
      const formattedDate = `${year}-${month}-${day}`;
      this.localFilters['release_date.lte'] = formattedDate;
    },
    genreSelected(id) {
      const current = this.localFilters['with_genres'];
      const idStr = String(id);
      const genreArray = current ? current.split(',') : [];

      if (genreArray.includes(idStr)) {
        this.localFilters['with_genres'] = genreArray
          .filter(item => item !== idStr)
          .join(',');
      } else {
        genreArray.push(idStr);
        this.localFilters['with_genres'] = genreArray.join(',');
      }
    },
    ratingSelected(ratingValue, typeValue){
      if (typeValue === 0){
        this.localFilters['vote_average.gte'] = ratingValue[0] 
      } else {
        this.localFilters['vote_average.lte'] = ratingValue[1] 
      }      
    },
    votesSelected(votesValue){
      this.localFilters['vote_count.gte'] = votesValue
    }
  }
};
</script>