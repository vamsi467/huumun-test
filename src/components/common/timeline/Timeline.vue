<template>
  <div class="timeline-container">
    <ul class="timeline">
      <li
        v-for="(item, index) in timelineItems"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="setActiveIndex(index)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, Ref } from "vue";

  export interface TimelineItem {
    label: string;
  }
  const props = defineProps<{
    timelineItems: Array<{ label: string }>;
    initialActiveIndex: number;
  }>();

  const activeIndex: Ref<number> = ref(props.initialActiveIndex);
  const emit = defineEmits(["active-index"]);

  const setActiveIndex = (index: number) => {
    activeIndex.value = index;
    emit("active-index", index);
  };
</script>

<style>
  .timeline {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .timeline li {
    cursor: pointer;
    padding: 0.5rem 3rem;
    border-bottom: 6px solid #E0E0E1;
  }

  .timeline li.active {
    border-bottom: 6px solid #33afdf;
    color: #33afdf;
  }
</style>
