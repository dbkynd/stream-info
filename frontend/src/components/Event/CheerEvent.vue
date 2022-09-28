<template>
  <SuperChat v-if="isSuperChat" :data="data" />
  <BitsCheer v-else :data="data" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BitsCheer from './Cheer/BitsCheer.vue';
import SuperChat from './Cheer/SuperChat.vue';
import { Cheer } from '@/types/events';

const props = defineProps<{
  data: Cheer;
}>();

const isSuperChat = computed((): boolean => {
  return props.data.payload.userstate['msg-id'] === 'midnightsquid';
});
</script>
