<script setup lang="ts">
import { provide, ref, watch, watchEffect } from "vue";
import type {
  CollapseItemEmits,
  CollapseProps,
  CollapseItemName,
} from "./types";
import { COLLAPSE_CTX_KEY } from "./constants";
import { debugWarn } from "@toy-element/utils";
const COMP_NAME = "ErCollapse";
defineOptions({
  name: COMP_NAME,
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseItemEmits>();
const activeNames = ref(props.modelValue);

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value];
  if (props.accordion) {
    _activeNames = item === activeNames.value[0] ? [] : [item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index === -1) {
    _activeNames.push(item);
  } else {
    _activeNames.splice(index, 1);
  }
  updateActiveNames(_activeNames);
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
}

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, "accordion mode should only have one active item");
  }
});
watch(
  () => props.modelValue,
  (newVal) => {
    activeNames.value = newVal;
  }
);
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
