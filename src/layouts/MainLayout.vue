<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/discover_movies">Discover Movies</router-link>
    </nav>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>