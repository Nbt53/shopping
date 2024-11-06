<template>
  <nav class="nav-bar">
    <ul class="nav-items">
      <li class="nav-component">
        <link-span
          :destination="'Home'"
          :url="'/'"
          :icon="'home'"
        ></link-span>
      </li>
      <li class="nav-component">
        <span class="brand">Pecksniffs: A Family App</span>
      </li>
      <li class="nav-component" v-if="isLoggedIn">
        <button @click="handleLogout">Logout</button>
      </li>
      <li class="nav-component" v-else>Login</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useIsLoggedIn from "../composables/user/isLoggedIn";
import useLogout from "../composables/user/LogOut";
import { useRouter } from "vue-router";
import LinkSpan from "./LinkSpan.vue";

export default defineComponent({
  components: { LinkSpan },
  name: "NavBar",
  setup() {
    const { isLoggedIn } = useIsLoggedIn();
    const router = useRouter();

    const handleLogout = async () => {
      const confirmation = window.confirm("Are you sure you want to logout?");
      if (confirmation) {
        const { logout } = useLogout();
        await logout();
        alert("Logout successful");
        router.push("/login");
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
  height: 10vh;
  position: absolute;
  bottom: 0;
}

.nav-items {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 18px;
}

.brand {
  color: var(--color-primary);
  font-size: 20px;
  font-weight: bold;
  padding: 0 8px;
  text-align: center;
  text-justify: center;
}
</style>