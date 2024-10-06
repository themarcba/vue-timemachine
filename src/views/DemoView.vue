<script setup lang="ts">
import useTimeMachine from "@/composables/useTimeMachine";
const { state, history, historyIndex, backwards, forwards, backInTime } = useTimeMachine({
  age: 37,
});
</script>
<template>
  <h1>Game</h1>
  <div>age: {{ state.age }}</div>
  <div style="margin: 1rem 0; display: flex; gap: 1rem">
    <button @click="state.age++">+</button>
    <button @click="backwards()">back</button>
    <button @click="forwards()">forwards</button>
    <button @click="backInTime(5)">back in time 5s</button>
  </div>
  <hr />
  Index: {{ historyIndex }}
  <pre>{{ history }}</pre>
</template>

<style scoped></style>
