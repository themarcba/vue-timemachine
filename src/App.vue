<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

* {
  font-family: "Press Start 2P";
}
body {
  margin: 0;
  background-color: #000;
  color: #fff;
}

main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
