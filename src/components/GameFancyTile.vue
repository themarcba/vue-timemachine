<script setup lang="ts">
import { defineProps, computed } from "vue";
import { tileTypes } from "@/utils/game";

const props = defineProps<{
  tileCharacter: string;
  isPlayer: boolean;
}>();

const tileType = computed(() => tileTypes[props.tileCharacter]?.type);

const contentBackgroundUrl = computed(() => {
  if (tileType.value === "OBSTACLE") return "url(/images/game-tiles/tree.png)";
  else if (tileType.value === "GRASS") return "url(/images/game-tiles/grass.png)";
  else if (tileType.value === "ROAD") return "url(/images/game-tiles/road.png)";
  else if (tileType.value === "HAZARD") return "url(/images/game-tiles/snake.gif)";
  else if (tileType.value === "POTION") return "url(/images/game-tiles/potion.png)";
  else if (tileType.value === "TREASURE") return "url(/images/game-tiles/treasure.png)";
  else if (tileType.value === "INVISIBLE_HAZARD_UNCOVERED")
    return "url(/images/game-tiles/fire.gif)";
  else if (props.isPlayer) return "url(/images/game-tiles/wizard.png)";
});

const playerDisplay = computed(() => {
  if (props.isPlayer) return "block";
  return "none";
});
</script>

<template>
  <div class="tile"></div>
</template>

<style scoped>
.tile {
  --tile-size: 40px;
  width: var(--tile-size);
  height: var(--tile-size);
  background: url(/images/game-tiles/ground.png);
  background-size: cover;
  ::before {
    content: "";
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
    background: v-bind(contentBackgroundUrl);
    background-size: cover;
  }
  ::after {
    display: v-bind(playerDisplay);
    content: "";
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
    background: url(/images/game-tiles/wizard.png);
    background-size: cover;
  }
}
</style>
