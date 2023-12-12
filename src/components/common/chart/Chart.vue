<template>
  <div ref="chartContainer" class="chart-container">
    <div
      v-if="isVisible"
      class="chart-tooltip"
      :style="{ top: tooltipPosition.y + 'px', left: tooltipPosition.x + 'px' }"
    >
      <div>{{ tooltipContent.title }}</div>
      <div>{{ tooltipContent.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useChart } from "./chart.utils";
  import { IChart } from "./chart.types";

  export default defineComponent({
    props: {
      options: {
        type: Object as () => IChart,
        required: true,
      },
    },
    setup(props) {
      const chartContainer = ref(null);
      const { isVisible, tooltipContent, tooltipPosition } = useChart(
        computed(() => props.options),
        chartContainer,
      );

      return { chartContainer, isVisible, tooltipContent, tooltipPosition };
    },
  });
</script>

<style>
  .chart-container {
    width: 100%;
    height: 600px; /* Or any desired height */
  }
  .chart-tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    pointer-events: none;
    opacity: 0.9;
  }
</style>
