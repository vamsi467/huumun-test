<template>
  <svg :width="tireSize + 20" :height="tireSize + 20" xmlns="http://www.w3.org/2000/svg">
    <g>
      <!-- Outer Tire -->
      <circle
        :cx="center"
        :cy="center"
        :r="tireSize / 2"
        style="fill: black; stroke: grey; stroke-width: 5"
      />

      <!-- Inner Rim -->
      <circle :cx="center" :cy="center" :r="tireSize / 2 - 15" style="fill: darkgrey" />

      <!-- Wheel Nuts -->
      <circle
        v-for="(nut, index) in wheelNuts"
        :key="index"
        :cx="nut.x"
        :cy="nut.y"
        r="2"
        style="fill: silver"
      />

      <!-- Rotation Animation -->
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        :from="`0 ${center} ${center}`"
        :to="`360 ${center} ${center}`"
        dur="2s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { defineProps, computed } from "vue";

  type Props = {
    tireSize: number;
  };

  const props = defineProps<Props>();
  const tireSize = props.tireSize || 80; // Provide a default value if tireSize is not passed
  const center = computed(() => tireSize / 2 + 10);

  // Calculate wheel nuts positions
  const wheelNuts = computed(() => {
    const radius = tireSize / 2 - 5; // Position nuts slightly inside the outer edge
    const nuts: any[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i; // Divide the circle into 8 equal parts
      const x = center.value + radius * Math.cos(angle);
      const y = center.value + radius * Math.sin(angle);
      nuts.push({ x, y });
    }
    return nuts;
  });
</script>
