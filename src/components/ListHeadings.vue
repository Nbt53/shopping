<template>
  <div class="create-list__headings">
    <div class="headings-name"><span>Name</span></div>

    <div class="headings-options">
      <div>Quantity</div>
      <div>Purchased</div>
      <div>Delete</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListHeadings",
  setup() {
    return {};
  },
});

</script>

<style>
.create-list__headings {
    font-size: 8px;
  color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 0 10px;

  border-radius: 10px;
}

.headings-name {
  width: 60%;
}

.headings-options {
  width: 40%;
  display: flex;
  justify-content: space-between;
}

</style>