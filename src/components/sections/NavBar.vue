<template>
  <div class="nav__bar-inner mb-[65px] py-[10px] flex items-center justify-between">
    <img src="@/assets/images/logo.png" alt="Logo">

    <nav class="nav__bar-navigation">
      <ul class="nav__bar-list flex gap-[40px]">
        <li class="nav__bar-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav__bar-item">
          <router-link to="/popular">Popular Films</router-link>
        </li>
        <li class="nav__bar-item">Latest Films</li>
        <li class="nav__bar-item">My List</li>
      </ul>
    </nav>

    <div class="nav__bar-control flex gap-[32px]">
      <img src="@/assets/images/icons/search.svg" alt="search-icon">
      <img src="@/assets/images/icons/user.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>