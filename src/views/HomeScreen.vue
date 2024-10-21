<template>
  <div>
    <div class="lists-container">
      <div class="lists" id="new-list">
        <ion-icon name="add-outline"></ion-icon>
      </div>
      <div class="lists">list1</div>
      <div class="lists">list2</div>
      <div class="lists">list3</div>
      <div class="lists">list 4</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeScreen",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.lists-container {
  display: flex;
  flex-wrap: wrap;
}

.lists {
  width: 45%;
  background-color: var(--color-text-light);
  margin: 8px;
  position: relative; /* Required for absolute positioning of content */
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>