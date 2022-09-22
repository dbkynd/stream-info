<template>
  <div class="date">
    <v-spacer />
    <span :title="date">
      {{ dateFormatted }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { useStore } from '@/store';

const props = defineProps<{
  date: string;
}>();

const store = useStore();

const now = computed(() => store.state.now?.now);

const dateFormatted = computed(() => {
  if (!now.value) return;
  const date = new Date(props.date);
  const diff = now.value - date.valueOf();
  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes <= 0) return 'Less than a minute ago';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  return DateTime.fromJSDate(date).toFormat('h:mma M/d/yy').toLowerCase();
});
</script>

<style scoped>
.date {
  font-size: 0.7rem;
  width: 100%;
  position: relative;
  text-align: right;
  left: 3px;
  height: 10px;
}
</style>
