<template>
  <Timeline
    :timeline-items="TIMELINE_ITEMS"
    :initial-active-index="TIMELINE_ITEMS.length - 1"
    @active-index="handleIndexChange"
  ></Timeline>

  <div class="select-container">
    <label for="standard-select">Countries</label>
    <div>
      <select id="standard-select" v-model="countryName" @change="handleChange()">
        <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
      </select>
      <span class="focus"></span>
    </div>
  </div>
  <Dashboard></Dashboard>
</template>

<script setup lang="ts">
  import { TIMELINE_ITEMS, countries } from "./Dashboard.const";
  import { useCountryPopulation } from "./Dashboard.utils";
  import Timeline from "@/components/common/timeline/Timeline.vue";
  import { onMounted, ref } from "vue";
  import Dashboard from "@/components/dashboard/Dashboard.vue";

  const { fetch, fetchState } = useCountryPopulation();
  const countryName = ref("All");
  const activeIndex = ref(TIMELINE_ITEMS.length - 1);
  const handleIndexChange = (index: number) => {
    activeIndex.value = index;

    handleChange();
  };

  const handleChange = () => {
    const activeTimelineItems = TIMELINE_ITEMS[activeIndex.value];

    fetch({ ...activeTimelineItems.range, country_name: countryName.value });
  };

  fetch({ ...TIMELINE_ITEMS[activeIndex.value].range, country_name: countryName.value });
</script>

<style lang="scss" scoped>
  .select-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
</style>
