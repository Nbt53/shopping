<template>
  <div v-if="loading">
    <loading-component />
  </div>
  <div class="list-view" v-else-if="documentData">
    <div class="list-view-body u-p-m u-scroll-l">
      <h1 class="list-view-title">{{ documentData.title }}</h1>
      <add-icon :addNew="addNew" @addNew="addNew = !addNew" />
      <div v-if="addNew" class="list-view__addItems">
        <input type="text" v-model="name" placeholder="Name" />
        <input
          type="number"
          min="1"
          v-model="quantity"
          placeholder="Quantity"
        />
        <button @click="handleAddItem">Add to list</button>
      </div>
      <ListHeadings />
      <div
        class="list-view-items"
        v-for="item in documentData.items"
        :key="item.id"
      >
        <list-items
          :name="item.name"
          :quantity="item.quantity"
          :purchased="item.purchased"
          @remove="removeItem"
          @togglePurchase="togglePurchase"
        />
      </div>
    </div>
    <div class="list-buttons">
      <button class="btn-error" @click="deleteList">Delete</button>
    </div>
  </div>
  <div v-else>
    <h1>error {{ error }}</h1>
  </div>
</template>

<script lang="ts">
import ListItems from "@/components/ListItems.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import getDocument from "@/composables/getDocument";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import deleteDocument from "@/composables/useDeleteDocument";
import updateDocument from "@/composables/useUpdateDocument";
import AddIcon from "@/components/AddIcon.vue";
import ListHeadings from "@/components/ListHeadings.vue";
export default defineComponent({
  components: { LoadingComponent, ListItems, AddIcon, ListHeadings },
  name: "ListView",

  setup() {
    const route = useRoute();
    const id: string = route.params.id as string;
    const documentData = ref<any | null>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const addNew = ref<boolean>(false);
    const name = ref<string>("");
    const quantity = ref<number>(1);
    const router = useRouter();

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

    const togglePurchase = async (itemId: {
      name: string;
      purchased: boolean;
    }) => {
      documentData.value.items = documentData.value.items.map((item: any) => {
        if (item.name === itemId.name) {
          item.purchased = !item.purchased;
        }
        return item;
      });

      await updateDocument("lists", id, documentData.value);
    };

    const handleAddItem = async () => {
      if (!name.value) {
        error.value = "Please fill in item name";
        return;
      }
      if (quantity.value < 1) {
        error.value = "Quantity must be greater than 0";
        return;
      }

      documentData.value.items.push({
        name: name.value,
        quantity: quantity.value,
        purchased: false,
      });

      await updateDocument("lists", id, documentData.value);
      name.value = "";
      quantity.value = 1;
    };

    const removeItem = async (itemName: string) => {
      documentData.value.items = documentData.value.items.filter(
        (item: any) => item.name !== itemName
      );

      await updateDocument("lists", id, documentData.value);
    };

    const deleteList = () => {
      deleteDocument("lists", id);
      router.push("/");
    };
    return {
      documentData,
      name,
      quantity,
      error,
      loading,
      addNew,
      togglePurchase,
      removeItem,
      handleAddItem,
      deleteList,
    };
  },
});
</script>

<style>
.list-view-title {
  text-align: center;
  color: var(--color-text-light);
  background-color: var(--color-secondary);
  padding: 16px;
}

.list-buttons {
  padding: 8px;
  display: flex;
  justify-content: center;
}

.list-view__addItems {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>