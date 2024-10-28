<template>
  <div class="lists" :id="id" @click="navigate">
    <ion-icon :name="icon"></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ListCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const navigate = () => {
      if (props.id === "new-list") {
        router.push("/CreateList");
      } else {
        router.push(`/list/${props.id}`);
      }
      
    };

    return { props, navigate };
  },
});
</script>

<style>
</style>