<template>
  <nav class="nav-bar">
    <ul class="nav-items">
        <li class="nav-component">Home</li>
    <li class="nav-component">Settings</li>
    <li class="nav-component" v-if="isLoggedIn">Logout</li>
    <li class="nav-component" v-else>Login</li>
    </ul>
    
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import useIsLoggedIn from "../composables/user/isLoggedIn";

export default defineComponent({
  name: "NavBar",
  setup() {
    const { isLoggedIn } = useIsLoggedIn();
    
    return {isLoggedIn};
  },
});
</script>

<style>
.nav-bar {
  display: flex;
  background-color: #f0f0f0;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.nav-items {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

</style>