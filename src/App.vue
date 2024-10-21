<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<style>
li{
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
}
</style>