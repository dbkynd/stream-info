<template>
  <EventCard :data="data">
    <span class="name">{{ username }}</span>
    <span class="amount">&nbsp;{{ bits }}</span>
    <span v-if="showCheerTotalValue" class="dollars">&nbsp;${{ dollars }}</span>
    <template #footer>
      <div class="card-footer"></div>
    </template>
  </EventCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import EventCard from './EventCard.vue';
import { displayName } from '@/plugins/utils';
import { useStore } from '@/store';
import { Cheer } from '@/types/events';

const store = useStore();

const props = defineProps<{
  data: Cheer;
}>();

const username = computed(() => {
  return displayName(
    props.data.payload.userstate['username'],
    props.data.payload.userstate['display-name'],
  );
});

const showCheerTotalValue = computed(() => {
  return store.state.settings.showCheerTotalValue;
});

const bits = computed(() => {
  return props.data.payload.userstate['bits'];
});

const dollars = computed(() => {
  const bits = props.data.payload.userstate['bits'];
  if (!bits) return '';
  const value = parseInt(bits) / 100;
  if (value % 1 !== 0) {
    return value.toFixed(2);
  } else {
    return value.toString();
  }
});
</script>

<style scoped>
.dollars {
  color: gray;
  font-size: 0.8em;
  position: relative;
  bottom: 3px;
  margin-left: 3px;
}
</style>
