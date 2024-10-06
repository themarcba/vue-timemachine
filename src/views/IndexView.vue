<script setup lang="ts"></script>

<template>
  <div class="index">
    <h1>Building a Time Machine with <span class="vue">Vue</span></h1>
    <div style="display: flex; gap: 1rem">
      <RouterLink to="/demo">Demo</RouterLink>
      |
      <RouterLink to="/game">Game</RouterLink>
      |
      <a href="https://github.com/themarcba/vue-timemachine">Code</a>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
  text-align: center;
}
.vue {
  color: #42b883;
}
.index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1rem;
  font-size: 1rem;
  padding: 1rem;
  line-height: 1.5;
  a {
    color: #fff;
  }
}
</style>
