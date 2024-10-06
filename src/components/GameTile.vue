<script setup lang="ts">
import { defineProps, computed } from "vue";
import { tileTypes } from "@/utils/game";

const props = defineProps<{
  tileCharacter: string;
  isPlayer: boolean;
}>();

const tile = computed(() => {
  if (props.isPlayer) return "🧙‍♂️";
  return tileTypes[props.tileCharacter]?.emoji;
});
</script>

<template>
  <div class="tilex">{{ tile }}</div>
</template>

<style scoped>
.tilex {
  width: 40px;
  height: 40px;
  font-size: 35px;
  background-color: rgb(221, 171, 91);
}
</style>
