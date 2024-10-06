<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  hasWon: boolean;
}>();

const backgroundColor = computed(() => (props.hasWon ? "green" : "red"));
</script>

<template>
  <div class="game-end">{{ props.hasWon ? "winner" : "wasted" }}</div>
</template>

<style scoped>
.game-end {
  z-index: 1001;
  opacity: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: v-bind(backgroundColor);
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 7rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: white;
}
</style>
