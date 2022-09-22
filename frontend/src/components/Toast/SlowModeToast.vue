<template>
  <div class="container">
    <span v-if="value === false">
      Slow Mode <span class="bold">OFF</span>
    </span>
    <span v-else>
      Slow Mode <span class="bold">{{ amount }} {{ unit }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: boolean | string;
}>();

const amount = computed(() => {
  if (typeof props.value === 'boolean') return;
  const num = parseInt(props.value);
  if (num % 60 === 0) return num / 60;
  return num;
});

const unit = computed(() => {
  if (typeof props.value === 'boolean') return;
  const num = parseInt(props.value);
  if (num === 60) return 'minute';
  if (num % 60 === 0) return 'minutes';
  if (num === 1) return 'second';
  return 'seconds';
});
</script>
