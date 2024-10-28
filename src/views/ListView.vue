<template>
  <div class="list-view"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ListView",

  setup() {
    const route = useRoute();
    const id = route.params.id;
    const loading = ref(false);

    return { loading };
  },
});
</script>

<style>
</style>