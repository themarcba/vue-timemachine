<script setup>
import { ref, computed } from "vue";
import { onKeyStroke } from "@vueuse/core";

import map from "@/data/map";
import { mapToMatrix, tileTypes } from "@/utils/game";

import RetroButton from "@/components/RetroButton.vue";
import GameBoard from "@/components/GameBoard.vue";
import GameStats from "@/components/GameStats.vue";
import GameEnd from "@/components/GameEnd.vue";
import useGame from "@/composables/useGame";

const { state: gameState, move } = useGame({
  health: 100,
  positionX: 1,
  positionY: 9,
  hasFoundTreasure: false,
  matrix: mapToMatrix(map),
});
const matrix = computed(() => gameState.matrix);
const position = computed(() => ({
  x: gameState.positionX,
  y: gameState.positionY,
}));

const hasGameEnded = computed(() => gameState.health <= 0 || gameState.hasFoundTreasure);
onKeyStroke("ArrowRight", () => move(1, 0));
onKeyStroke("ArrowLeft", () => move(-1, 0));
onKeyStroke("ArrowUp", () => move(0, -1));
onKeyStroke("ArrowDown", () => move(0, 1));
</script>
<template>
  <div class="game">
    <GameStats :health="gameState.health" />
    <GameBoard :position :matrix />
    <GameEnd v-if="hasGameEnded" :hasWon="gameState.hasFoundTreasure" />
    <div class="controls">
      <!-- <RetroButton @click="backInTime(5)">back in time</RetroButton>
      <RetroButton @click="backwards">backwards</RetroButton>
      <RetroButton @click="forwards">forwards</RetroButton> -->
      <!-- <RetroButton @click="changeTimeline(-1)"> previous timeline </RetroButton>
      <RetroButton @click="changeTimeline(1)">next timeline</RetroButton> -->
    </div>
    <!-- <div class="information">Timeline: VUEJS.DE-{{ timelineIndex }}</div> -->
  </div>
</template>

<style scoped>
.game {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
.controls,
.information {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  gap: 1rem;
}
</style>
