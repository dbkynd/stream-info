<template>
  <div class="container">
    <span v-if="value === false">
      {{ name }} mode <span class="bold">OFF</span>
    </span>
    <span v-else> {{ name }} mode <span class="bold">ON</span></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: boolean | string;
}>();
</script>
