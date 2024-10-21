<template>
  <div>
    <div class="lists-container">
      <div class="lists" id="new-list">+</div>
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
.lists-container{
    display: flex;
    flex-wrap: wrap;
   
     
}

.lists{
    width: 100px;
    height: 100px;
    background-color: #f0f0f0;
    margin: 8px;
}
</style>