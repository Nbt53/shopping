<template>
  <div class="loading">
    <ion-spinner name="dots"></ion-spinner>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonSpinner } from "@ionic/vue";

export default defineComponent({
  name: "LoadingComponent",
  components: {
    IonSpinner,
  },
  setup() {
    return {};
  },
});
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading ion-spinner {
  height: 100px;
  width: 100px;
  color: var(--ion-color-primary);
}
</style>