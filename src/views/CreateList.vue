<template>
  <div class="create-container">
    <div class="create-header">
      <input type="text" v-model="title" />
    </div>
    <select v-model="icon">
      <option v-for="icon in iconsList" :key="icon.name" :value="icon">
        {{ icon.name }}
      </option>
    </select>
    <div class="create-body">
      <div class="error" v-if="error">{{ error }}</div>
      <div class="create-inputs">
        <input type="text" v-model="name" placeholder="Name" />
        <input
          type="number"
          min="1"
          v-model="quantity"
          placeholder="Quantity"
        />
        <button @click="addItem">Add to list</button>
        <div class="create-list">
          
          <div class="u-scroll">
            <list-headings />
            <div class="list-item" v-for="item in items" :key="item.name">
              <ListItems
                :name="item.name"
                :quantity="item.quantity"
                :purchased="item.purchased"
                @remove="handleRemove"
                @togglePurchase="togglePurchase"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="saveList">Save List</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { List, ListItem } from "../interfaces/ListTypes";
import { pushToList } from "@/composables/pushToList";
import ListItems from "@/components/ListItems.vue";
import useCollection from "@/composables/useAddCollection";
import router from "@/router";
import { icons } from "@/composables/iconLists";
import { timestamp } from "@/configs/firebase";
import ListHeadings from "@/components/ListHeadings.vue";

export default defineComponent({
  name: "CreateList",
  components: {
    ListItems,
    ListHeadings,
  },
  setup() {
    const title = ref("New List");
    const name = ref("");
    const quantity = ref(1);
    const items = ref<ListItem[]>([]);
    const error = ref("");
    const iconsList = icons;
    const icon = ref(iconsList[0]);
    const { addDocToFirebase, error: firebaseError } = useCollection("lists");

    const addItem = () => {
      error.value = "";
      if (!name.value) {
        error.value = "Please fill in item name";
        return;
      }
      if (quantity.value < 1) {
        error.value = "Quantity must be greater than 0";
        return;
      }

      pushToList(name.value, quantity.value, items.value);
      name.value = "";
      quantity.value = 1;
    };

    const saveList = () => {
      const list: List = {
        id: crypto.randomUUID(),
        title: title.value,
        items: items.value,
        icon: icon.value,
        createdAt: timestamp(),
      };
      try {
        addDocToFirebase(list);
        router.push("/");
      } catch (err) {
        error.value = firebaseError.value;
        console.error(err);
      }
    };

    const handleRemove = (name: string) => {
      items.value = items.value.filter((item) => item.name !== name);
    };

    const togglePurchase = (payload: { name: string; purchased: boolean }) => {
      const item = items.value.find((item) => item.name === payload.name);
      if (item) {
        item.purchased = payload.purchased;
      }
    };

    return {
      title,
      name,
      quantity,
      items,
      error,
      icon,
      iconsList,
      addItem,
      saveList,
      handleRemove,
      togglePurchase,
    };
  },
});
</script>

<style scoped>
.create-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text);
  padding: 40px 40px;
}
.create-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.create-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.create-body {
  margin: 10px 0;
}

input {
  border: unset;
  padding: 10px;
  margin-bottom: 10px;
}

.create-list {
  width: 100%;
}



span {
  color: var(--color-secondary);
  font-size: 8px;
}
</style>