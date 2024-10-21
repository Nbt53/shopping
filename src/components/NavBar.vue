<template>
  <nav class="nav-bar">
    <ul class="nav-items">
      <li class="nav-component">Home</li>
      <li class="nav-component">Settings</li>
      <li class="nav-component" v-if="isLoggedIn">
        <button @click="handleLogout">Logout</button>
      </li>
      <li class="nav-component" v-else>Login</li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import useIsLoggedIn from "../composables/user/isLoggedIn";
import useLogout from "../composables/user/LogOut";

export default defineComponent({
  name: "NavBar",
  setup() {
    const { isLoggedIn } = useIsLoggedIn();

    const handleLogout = async () => {
      const confirmation = window.confirm("Are you sure you want to logout?");
      if (confirmation) {
        const { logout } = useLogout();
        await logout();
        alert("Logout successful");
        window.location.reload();
      }
    };

    return { isLoggedIn, handleLogout };
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