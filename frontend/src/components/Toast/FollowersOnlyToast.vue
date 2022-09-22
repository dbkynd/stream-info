<template>
  <div class="container">
    <span v-if="value === '-1'">
      Followers Only <span class="bold">OFF</span>
    </span>
    <span v-else-if="value === false">
      Followers Only <span class="bold">ON</span>
    </span>
    <span v-else>
      Followers Only <span class="bold">{{ amount }} {{ unit }}</span>
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
  const num = parseInt(props.value || '0');
  if (num % 10080 === 0) return num / 10080;
  if (num % 1440 === 0) return num / 1440;
  if (num % 60 === 0) return num / 60;
  return num;
});

const unit = computed(() => {
  if (typeof props.value === 'boolean') return;
  const num = parseInt(props.value || '0');
  if (num === 10080) return 'week';
  if (num % 10080 === 0) return 'weeks';
  if (num === 1440) return 'day';
  if (num % 1440 === 0) return 'days';
  if (num === 60) return 'hour';
  if (num % 60 === 0) return 'hours';
  if (num === 1) return 'minute';
  return 'minutes';
});
</script>
