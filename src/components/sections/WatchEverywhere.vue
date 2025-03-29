<template>
  <div class="watchEverywhere__inner">
    <div class="watchEverywhere__box page__container flex justify-between items-center ">
      <div class="watchEverywhere__content max-w-[600px]">
        <h3 class="watchEverywhere__title text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]">Watch everywhere</h3>
        <p class="watchEverywhere__desc mt-[80px] mb-[60px]">You can find everything related to movies here. Be without limited. You can browse anywhere on your phone, tablet, laptop. You can be flexible. You can also use our app offline.</p>
        <button class="watchEverywhere__btn rounded-[20px] bg-white text-black py-[11px] px-[42px]">Let’s start</button>
      </div>
      <div class="watchEverywhere__images">
        <img src="@/assets/images/watchEveryWhere.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.watchEverywhere__inner {
  background: linear-gradient(180deg, rgba(5, 59, 163, 0.00) 0%, #053BA3 100%);
}
</style>