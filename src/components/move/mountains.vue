<template>
  <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="skyblue" />
    <polygon v-for="(mountain, index) in positionedMountains" :key="index" :points="mountain" fill="grey" />
  </svg>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";

  const width = 1600;
  const height = 500;
  const numMountains = 10;

  function generateMountain(index) {
    let mountainWidth = width / numMountains;
    let peakHeight = Math.random() * (height - 50) + 50;
    let baseHeight = height;
    return { mountainWidth, baseHeight, peakHeight };
  }

  const mountains = ref(Array.from({ length: numMountains }, (_, i) => generateMountain(i)));

  function updateMountains() {
    mountains.value.shift();
    mountains.value.push(generateMountain(mountains.value.length));
  }
  const positionedMountains = computed(() => {
    return mountains.value.map(({ mountainWidth, baseHeight, peakHeight }, index) => {
      let startX = index * mountainWidth;
      let peakX = startX + mountainWidth / 2;
      let endX = startX + mountainWidth;

      return `${startX},${baseHeight} ${peakX},${peakHeight} ${endX},${baseHeight}`;
    });
  });

  let intervalId;
  onMounted(() => {
    intervalId = setInterval(updateMountains, 1000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });
</script>
