<template>
  <div class="list-items">
    <div class="list-item">{{ name }}</div>
    <div class="list-item">{{ quantity }}</div>
    <input
      type="checkbox"
      name="purchased"
      id="purchased"
      :value="purchased"
      @change="togglePurchased"
    />

    <ion-icon
      class="delete"
      name="trash-bin-outline"
      @click="removeItem"
    ></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItems",
  emits: ["remove", "togglePurchase"],
  props: {
    name: String,
    quantity: Number,
    purchased: Boolean,
  },
  setup(props, { emit }) {
    const removeItem = () => {
      emit("remove", props.name);
    };

    const togglePurchased = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("togglePurchase", { name: props.name, purchased: target.checked });
    };
    return { removeItem, togglePurchased };
  },
});
</script>

<style>
.list-items {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-secondary);
  border-radius: 10px;
  padding: 8px;
}
.list-item {
  padding: 10px;
}

.delete {
  color: var(--color-error);
  font-size: 20px;
}
</style>