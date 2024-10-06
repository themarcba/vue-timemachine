<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  age: 37,
});
</script>
<template>
  <h1>Game</h1>
  <div>age: {{ state.age }}</div>
  <div style="margin: 1rem 0; display: flex; gap: 1rem">
    <button @click="state.age++">+</button>
  </div>
  <hr />
</template>

<style scoped>
* {
  font-family: monospace;
  font-size: 1.5rem;
}
</style>
