<script setup lang="ts">
import GameTile from "./GameTile.vue";
import GameFancyTile from "./GameFancyTile.vue";

const props = defineProps<{
  position: { x: number; y: number };
  matrix: string[][];
}>();
</script>

<template>
  <div class="game-board">
    <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="row">
      <div v-for="(tileCharacter, colIndex) in row" :key="colIndex" class="tile">
        <GameFancyTile
          :tileCharacter
          :isPlayer="position.x === colIndex && position.y === rowIndex"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
