<template>
  <div>
    <vue-cal 
      date-picker 
      :views="['month', 'year']" 
      @update:selectedDate="onDateSelected"
    />
  </div>
</template>

<script>
import { VueCal } from "vue-cal";
import "vue-cal/style";

export default {
  components: {
    VueCal,
  },
  props: {
    dateType: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    onDateSelected(date){
      const [day, month, year] = new Date(date).toLocaleDateString().split('.')
      const formattedDate = `${year}-${month}-${day}`
      this.$emit('onDateSelected', formattedDate, this.dateType)
    },
  },
};
</script>

<style scoped>
.vuecal {
  --vuecal-primary-color: #316191;
  --vuecal-secondary-color: #2e2e2e;
  --vuecal-base-color: #ffffff;
  --vuecal-contrast-color: #000000;
  --vuecal-border-color: color-mix(in srgb, var(--vuecal-base-color) 8%, transparent);
  --vuecal-header-color: var(--vuecal-base-color);
  --vuecal-event-color: var(--vuecal-base-color);
  --vuecal-event-border-color: currentColor;
  --vuecal-border-radius: 6 px;
  --vuecal-height: 500 px;
  --vuecal-min-schedule-width: 0 px;
  --vuecal-min-cell-width: 0 px;
  --vuecal-transition-duration: 0, 25 s;
}
</style>
