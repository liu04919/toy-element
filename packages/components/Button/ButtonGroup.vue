<script setup lang="ts">
import type { ButtonGroupProps } from "./types";
import { BUTTON_GROUP_KEY } from "./contants";
import { provide, reactive, toRef } from "vue";
defineOptions({
  name: "ErButtonGroup",
});
const props = defineProps<ButtonGroupProps>();

provide(
  BUTTON_GROUP_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  })
);
</script>

<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
