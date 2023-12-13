<template>
  <Timeline
    :timeline-items="TIMELINE_ITEMS"
    :initial-active-index="TIMELINE_ITEMS.length - 1"
    @active-index="handleActiveIndexChange"
  ></Timeline>
  <Dashboard></Dashboard>
</template>

<script setup lang="ts">
  import { TIMELINE_ITEMS } from "./Dashboard.const";
  import { useCountryPopulation } from "./Dashboard.utils";
  import Timeline from "@/components/common/timeline/Timeline.vue";
  import { onMounted, ref } from "vue";
  import Dashboard from "@/components/dashboard/Dashboard.vue";

  const { fetch, fetchState } = useCountryPopulation();

  const handleActiveIndexChange = (index: number) => {
    const activeTimelineItems = TIMELINE_ITEMS[index];

    fetch(activeTimelineItems.range);
  };

  fetch(TIMELINE_ITEMS[TIMELINE_ITEMS.length - 1].range);
</script>

<style lang="scss" scoped></style>
