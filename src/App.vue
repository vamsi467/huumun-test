<template>
  <section class="wrapper">
    <header class="wrapper__header">
      <div class="">
        <img src="https://huumun.com/wp-content/uploads/2020/07/huumun-logo.svg" height="48" alt="huumun" />
      </div>
    </header>
    <div class="wrapper__content">
      <router-view />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    &__header {
      height: 4rem;
      padding: 0.5rem 2rem;
    }
    &__content {
      margin-top: 1rem;
      height: calc(100vh - 4rem);
    }
  }
</style>
