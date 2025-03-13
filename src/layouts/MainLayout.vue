<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/popular">Popular Films</router-link>
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