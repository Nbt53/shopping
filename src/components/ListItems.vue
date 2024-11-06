<template>
  <div class="list-items u-mb-m">
    <div class="list-item__name">{{ name }}</div>
    <div class="list-item__options">
      <div class="">{{ quantity }}</div>
      <label class="custom-checkbox">
        <input
          type="checkbox"
          name="purchased"
          id="purchased"
          v-model="localPurchased"
          @change="togglePurchased"
        />
        <span class="checkmark"></span>
      </label>

      <ion-icon
        class="delete"
        name="trash-bin-outline"
        @click="removeItem"
      ></ion-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "ListItems",
  emits: ["remove", "togglePurchase"],
  props: {
    name: String,
    quantity: Number,
    purchased: Boolean,
  },
  setup(props, { emit }) {
    const localPurchased = ref(props.purchased);

    const removeItem = () => {
      emit("remove", props.name);
    };

    watch(
      () => props.purchased,
      (newVal) => {
        localPurchased.value = newVal;
      }
    );

    const togglePurchased = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("togglePurchase", { name: props.name, purchased: target.checked });
    };
    return { removeItem, togglePurchased, localPurchased };
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
  text-transform: capitalize;
  padding: 10px;
}

.list-item__name {
  width: 65%;
}
.list-item__options {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete {
  color: var(--color-error);
  font-size: 20px;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
}
.custom-checkbox input:checked + .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked + .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>