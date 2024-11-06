<template>
  <div v-if="!addNew">
    <ion-icon class="addIcon" @click="handleAdd" name="add-circle-outline">
    </ion-icon>
  </div>
  <div v-else>
    <ion-icon
      class="addIcon"
      @click="handleAdd"
      name="remove-circle-outline"
    ></ion-icon>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "addIcon",
  props: {
    addNew: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["addNew"],
  setup(props, { emit }) {
    const handleAdd = () => {
      emit("addNew");
    };

    return {
      handleAdd,
    };
  },
});
</script>

<style>
</style>