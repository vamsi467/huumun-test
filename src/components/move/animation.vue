<template lang="">
  <svg width="100%" height="100%">
    <rect width="100%" height="100%" fill="skyblue" />
    <Mountains></Mountains>
    <Car :x="200" :y="200"></Car>
  </svg>
</template>
<script setup>
  import Car from "./car.vue";
  import Mountains from "./mountains.vue";
</script>
<style lang=""></style>
