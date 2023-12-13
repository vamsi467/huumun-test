<template>
  <div ref="chartContainerRef" class="chart-container"></div>
</template>

<script>
  import { defineComponent, computed } from "vue";
  import { useChart } from "./pie.utlis.ts";

  export default defineComponent({
    props: {
      options: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { chartContainerRef } = useChart(computed(() => props.options));
      return { chartContainerRef };
    },
  });
</script>

<style scoped>
  .chart-container {
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
</style>
