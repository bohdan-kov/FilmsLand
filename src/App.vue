<template>
  <MainLoyout>
    <router-view />
  </MainLoyout>
</template>

<script>
import MainLoyout from "@/layouts/MainLayout.vue"

export default {
  name: 'App',
  component: {
    MainLoyout
  }
}
</script>

<style>

</style>
