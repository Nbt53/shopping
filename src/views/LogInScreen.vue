<template>
  <div class="logInPage">You need an Account to use this app</div>
  <LogInButton />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogInButton from "../components/LogInButton.vue";

export default defineComponent({
  name: "LogInScreen",
  components: {
    LogInButton,
  },
  setup() {
    return {};
  },
});
</script>

<style>
</style>