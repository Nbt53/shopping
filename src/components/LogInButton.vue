<template>
  <button class="logInButton" @click="handleLogin" >Log In</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useLogin} from "../composables/user/useLogin";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LogInButton",
  setup() {
    const {loginWithGoogle} = useLogin();
    const router = useRouter();

    const handleLogin = async (event: Event) => {
      event.preventDefault(); 
      try {
        await loginWithGoogle();
        router.back();

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