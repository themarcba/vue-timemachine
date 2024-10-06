<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <footer>
    With <span style="color: #ff4646"><3</span> by
    <a href="https://x.com/themarcba">Marc Backes</a>
  </footer>
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

footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.8rem;
  a {
    color: #fff;
  }
}
</style>
