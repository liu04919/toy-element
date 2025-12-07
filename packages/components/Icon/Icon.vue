<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";

defineOptions({
  name: "ErIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

const filteredProps = computed(() => omit(props, ["type", "icon"]));
const customStyle = computed(() => ({
  color: props.color ?? "undefined",
}));
</script>

<template>
  <i
    class="er-icon"
    :class="`er-icon--${type}`"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon :icon="icon" v-bind="filteredProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>
