<script setup lang="ts">
import type { DropdownItemProps } from "@toy-element/components";

const items: DropdownItemProps[] = [
  { command: 1, label: "Action 1" },
  { command: 2, label: "Action 2" },
  { command: 3, label: "Action 3", disabled: true },
  { command: 4, label: "Action 4", divided: true },
];

function handleCommand(command: string | number | object) {
  console.log("click on item " + command);
}
</script>

<template>
  <div style="padding: 100px">
    <h3>Basic Dropdown</h3>

    <h3 style="margin-top: 50px">Split Button Dropdown</h3>
    <er-dropdown
      split-button
      type="primary"
      :items="items"
      @command="handleCommand"
      @click="() => console.log('split button click')"
    >
      Split Button
    </er-dropdown>
  </div>
</template>

<style scoped></style>
