<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button class="retro-button" :disabled>
    <slot />
  </button>
</template>

<style scoped>
.retro-button {
  margin: 1rem;
  font-family: "Press Start 2P";
  background-color: #333;
  border: 4px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  box-shadow: 4px 4px 0 1px #ff6060;
  image-rendering: pixelated;
  transition: all 0.2s;
  text-transform: uppercase;
}
.retro-button:disabled {
  pointer-events: none;
  box-shadow: 4px 4px 0 1px #fff;
  opacity: 0.3;
}
.retro-button:hover {
  background-color: #ff6060;
  color: #fff;
}

.retro-button:active {
  transform: translate(4px, 4px);
  box-shadow: 0 0 0 0 black;
}
</style>
