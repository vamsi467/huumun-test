<template>
  <section class="chart-layout">
    <div class="chart-layout__header">
      <div class="chart-layout__header__title">
        <h2>{{ title }}</h2>
        <div>{{ subTitle }}</div>
      </div>
      <div class="chart-layout__header__actions">
        <div v-for="icon in icons" :key="icon.key">
          <font-awesome-icon
            :class="{ active: activeType === icon.key }"
            :icon="icon.icon"
            @click="$emit('change', icon.key)"
          />
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits, ref, Ref } from "vue";
  const props = defineProps<{
    title: string;
    subTitle: string;
    activeType: string;
  }>();
  const emit = defineEmits(["change"]);
  const icons = [
    { icon: "fa-solid fa-chart-area", key: "area" },
    { icon: "fa-solid fa-chart-line", key: "line" },
    { icon: "fa-solid fa-chart-bar", key: "bar" },
  ];
</script>
<style scoped lang="scss">
  .chart-layout {
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    &__header {
      display: flex;
      justify-content: space-between;
      &__title {
        display: flex;
        flex-direction: column;
      }
      &__actions {
        display: flex;
        justify-content: flex-end;
        & > * {
          text-align: center;
          background-color: #e0e0e1;
          border-radius: 100%;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0.75rem 0;
          .active {
            color: #33afdf;
          }
        }
      }
    }
  }
</style>
