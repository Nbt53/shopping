<template>
  <div v-if="loading">
    <loading-component />
  </div>
  <div class="list-view" v-else-if="documentData">
    <h1>{{ documentData.title }}</h1>
  </div>
  <div v-else>
    <h1>error {{ error }}</h1>
  </div>
</template>

<script lang="ts">
import LoadingComponent from "@/components/LoadingComponent.vue";
import getDocument from "@/composables/getDocument";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { LoadingComponent },
  name: "ListView",

  setup() {
    const route = useRoute();
    const id: string = route.params.id as string;
    const documentData = ref<any | null>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    onMounted(async () => {
      const { documentData: docData, error: mountError } = await getDocument(
        "lists",
        id
      );

      if (mountError.value) {
        error.value = mountError.value;
      } else {
        documentData.value = docData.value;
        loading.value = false;
      }
    });

    return { documentData, error, loading };
  },
});
</script>

<style>
</style>