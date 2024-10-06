<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  health: number;
}>();

const healthColor = computed(() => {
  if (props.health > 50) return "#00ff4b";
  if (props.health > 20) return "#ffa500";
  return "#ff4646";
});

const healthPercentage = computed(() => `${props.health}%`);
</script>

<template>
  <div class="health-bar">
    <div class="health-bar-inner" :style="{ width: `${props.health}%` }"></div>
  </div>
</template>

<style scoped>
.health-bar {
  width: 100%;
  padding: 0.2rem;
  background-color: #000;
}
.health-bar-inner {
  width: v-bind(healthPercentage);
  height: 5px;
  background-color: v-bind(healthColor);
}
</style>
