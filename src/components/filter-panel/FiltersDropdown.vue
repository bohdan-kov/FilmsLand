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
      <div class="filters-dropdown__item px-[16px] py-[14px] border-y-[2px] border-[#12192C]">
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
    </div>
  </div>
</template>

<script>
import clickOutside from "@/directives/v-click-outside.js";
import DatePicker from './filters/DatePicker.vue';

export default {
  components: { DatePicker },
  directives: { clickOutside },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpenFilter: true,
      isOpenCalendar: {
        'release_date.gte': false,
        'release_date.lte': false
      },
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
    }
  }
};
</script>