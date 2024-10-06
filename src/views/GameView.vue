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
import useTimeMachine from "@/composables/useTimeMachine";

const { state: gameState, move } = useGame({
  health: 100,
  positionX: 1,
  positionY: 9,
  hasFoundTreasure: false,
  matrix: mapToMatrix(map),
});
const {
  state: tmState,
  backInTime,
  changeTimeline,
  timelineIndex,
  backwards,
  forwards,
  timelines,
} = useTimeMachine(gameState);
const matrix = computed(() => tmState.matrix);
const position = computed(() => ({
  x: tmState.positionX,
  y: tmState.positionY,
}));

const hasGameEnded = computed(() => tmState.health <= 0 || tmState.hasFoundTreasure);
onKeyStroke("ArrowRight", () => move(1, 0));
onKeyStroke("ArrowLeft", () => move(-1, 0));
onKeyStroke("ArrowUp", () => move(0, -1));
onKeyStroke("ArrowDown", () => move(0, 1));
</script>
<template>
  <div class="game">
    <GameStats :health="tmState.health" />
    <GameBoard :position :matrix />
    <GameEnd v-if="hasGameEnded" :hasWon="tmState.hasFoundTreasure" />
    <div class="controls">
      <RetroButton @click="backInTime(5)">back in time</RetroButton>
      <RetroButton @click="backwards">backwards</RetroButton>
      <RetroButton @click="forwards">forwards</RetroButton>
      <RetroButton @click="changeTimeline(-1)"> previous timeline </RetroButton>
      <RetroButton @click="changeTimeline(1)">next timeline</RetroButton>
    </div>
    <div class="information">Timeline: VUEJS.DE-{{ timelineIndex }}</div>
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
