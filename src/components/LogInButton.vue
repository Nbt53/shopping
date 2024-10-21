<template>
  <button class="logInButton" @click="handleLogin" >Log In</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useLogin} from "../composables/user/useLogin";

export default defineComponent({
  name: "LogInButton",
  setup() {
    const {loginWithGoogle} = useLogin()

    const handleLogin = async (event: Event) => {
      event.preventDefault(); 
      try {
        await loginWithGoogle();
        window.location.reload();

      } catch (error) {
        console.error("Login failed", error);
      }
    };
    return {handleLogin};
  },
});
</script>

<style>
</style>