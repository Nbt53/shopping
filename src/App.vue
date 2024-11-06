<template>
  <div id="app">
    <NavBar />
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<style>
.view {
height: 90vh;
overflow: scroll;
}

</style>