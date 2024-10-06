<script setup lang="ts">
import { computed } from "vue";
import HealthBar from "./HealthBar.vue";

const props = defineProps<{
  health: number;
}>();

const healthColor = computed(() => {
  if (props.health > 50) return "#00ff4b";
  if (props.health > 20) return "#ffa500";
  return "#ff4646";
});
</script>

<template>
  <div class="game-stats">
    <div class="health">
      Health: {{ health }}%
      <HealthBar :health="health" style="width: 400px" />
    </div>
  </div>
</template>

<style scoped>
.game-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 1.5rem;
  font-family: monospace;
  font-weight: bold;
  margin-bottom: 1rem;
}
.health {
  color: v-bind(healthColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
