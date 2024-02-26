<template lang="">
  <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="10" width="70" height="30" style="fill: blue" />
    <rect x="12" y="30" width="150" height="50" style="fill: blue" />

    <rect x="42" y="15" width="25" height="15" style="fill: white" />
    <rect x="72" y="15" width="25" height="15" style="fill: white" />

    <Tyre x="20" y="50" r="10" :tire-size="30"></Tyre>
    <Tyre x="100" y="50" r="10" :tire-size="30"></Tyre>
  </svg>
</template>
<script setup>
  import Tyre from "./tyre.vue";
</script>
<style lang=""></style>
