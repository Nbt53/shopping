<template>
  <div>
    <div class="lists-container">
      <ListCard id="new-list" icon="add-outline" name="CreateList" />
      {{ error }}
      <ListCard
        v-for="list in documents"
        :key="list.id"
        :id="list.id"
        :icon="list.icon.icon"
        :name="list.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListCard from "@/components/ListCard.vue";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "HomeScreen",
  components: {
    ListCard,
  },

  setup() {
    const { error, documents } = getCollection("lists");

    return { error, documents };
  },
});
</script>

<style scoped>
.lists-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 10%;
}

.lists {
  width: 40%;
  background-color: var(--color-secondary);
  margin: 8px;
  position: relative; /* Required for absolute positioning of content */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
}
</style>