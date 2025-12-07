<script setup lang="ts">
import { computed, inject, ref } from "vue";
import type { ButtonProps, ButtonEmits } from "./types";
import { throttle } from "lodash-es";
import { BUTTON_GROUP_KEY } from "./contants";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErButton",
});

const {
  tag = "button",
  nativeType = "button",
  useThrottle = true,
  throttleDuration = 500,
  size,
  type,
  disabled,
} = defineProps<ButtonProps>();

const slots = defineSlots();

const emits = defineEmits<ButtonEmits>();
const _ref = ref<HTMLButtonElement>();
const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, throttleDuration, {
  leading: true,
  trailing: false,
});
const iconStyle = computed(() => ({
  marginRight: slots.default ? "8px" : "0",
}));
const ctx = inject(BUTTON_GROUP_KEY, undefined);
const _size = computed(() => ctx?.size ?? size ?? "");
const _type = computed(() => ctx?.type ?? type ?? "");
const _disabled = computed(() => ctx?.disabled || disabled || false);
// const ErIcon = resolveComponent("ErIcon");
defineExpose({
  ref: "_ref",
  _size,
  _type,
  _disabled,
});
</script>

<template>
  <component
    ref="_ref"
    :is="tag"
    class="er-button"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="_disabled || loading ? true : undefined"
    :autofocus="autofocus"
    :class="{
      [`er-button--${_type}`]: _type,
      [`er-button--${_size}`]: _size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': _disabled,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent)=>useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        ></er-icon>
      </slot>
    </template>
    <er-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    ></er-icon>
    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
