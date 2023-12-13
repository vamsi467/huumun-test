<template>
  <div class="stat-chart">
    <h2>{{ options.title }}</h2>
    <div class="stat-chart__items">
      <div v-for="item in options.items" :key="item.label" class="stat-chart__item">
        <font-awesome-icon v-if="item.icon" size="5x" :icon="item.icon" :style="{ color: item.color }" />
        <div>
          <div v-if="item.label" class="label">{{ item.label }}</div>
          <div v-if="item.subLabel" class="sub-label">{{ item.subLabel }}</div>
          <div class="value" :style="{ color: item.color }">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { IStatChart } from "./StatChart.types";

  export default defineComponent({
    name: "StatChart",
    props: {
      options: {
        type: Object as PropType<IStatChart>,
        required: true,
      },
    },
  });
</script>
<style scoped lang="scss">
  .stat-chart {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    margin: 1rem;
    padding: 1rem;
    &__items {
      display: flex;
    }
    &__item {
      margin: 10px;

      display: flex;
      & > * {
        padding: 0.75rem;
      }
    }
    .label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .value {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .sub-label {
      color: #7e7e7e;
    }
  }
</style>
