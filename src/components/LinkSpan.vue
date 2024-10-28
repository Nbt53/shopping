<template>
  <Span @click="handleClick">
    <div v-if="icon">
      <ion-icon :name="icon"></ion-icon>
    </div>
    {{ destination }}
  </Span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LinkSpan",
  props: {
    destination: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const handleClick = () => {
      router.push(props.url);
    };

    return { handleClick };
  },
});
</script>

<style scoped>
span {
  color: var(--color-primary);
  cursor: pointer;
  font-size: 16px;
}

ion-icon {
  font-size: 38px;
  margin-right: 8px;
}
</style>

