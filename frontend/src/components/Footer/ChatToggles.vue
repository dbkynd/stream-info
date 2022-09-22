<template>
  <div>
    <v-switch
      v-model="slow"
      label="Slow Mode"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="followers"
      label="Followers Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="subscribers"
      label="Subscribers Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="r9k"
      label="R9K Mode"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="emote"
      label="Emote Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="raidmode"
      label="Raid Mode"
      color="red"
      hide-details
      density="compact"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import api from '@/plugins/axios';
import { useStore } from '@/store';

const store = useStore();

const defaultSlow = computed(() => {
  return store.state.settings.defaultSlow || '60';
});
const defaultFollowers = computed(() => {
  return store.state.settings.defaultFollowers || '10';
});

const slow = computed({
  // false is off
  // "30" is 30 seconds
  get() {
    return store.state.roomstate.slow !== false;
  },
  set(enabled) {
    const message = enabled ? `/slow ${defaultSlow.value}` : '/slowoff';
    api.post('/say', { message });
  },
});

const followers = computed({
  // "-1" is off
  // false is 0 duration
  // "10" is 10 minutes
  get() {
    return store.state.roomstate['followers-only'] !== '-1';
  },
  set(enabled) {
    const message = enabled
      ? `/followers ${defaultFollowers.value}`
      : '/followersoff';
    api.post('/say', { message });
  },
});

const subscribers = computed({
  get() {
    // Boolean
    return store.state.roomstate['subs-only'];
  },
  set(enabled) {
    const message = enabled ? '/subscribers' : '/subscribersoff';
    api.post('/say', { message });
  },
});

const r9k = computed({
  // Boolean
  get() {
    return store.state.roomstate['r9k'];
  },
  set(enabled) {
    const message = enabled ? '/uniquechat' : '/uniquechatoff';
    api.post('/say', { message });
  },
});

const emote = computed({
  // Boolean
  get() {
    return store.state.roomstate['emote-only'];
  },
  set(enabled) {
    const message = enabled ? '/emoteonly' : '/emoteonlyoff';
    api.post('/say', { message });
  },
});

const raidmode = computed({
  // Boolean
  get() {
    return store.state.appState['raidmode'];
  },
  set(enabled) {
    api.post('/raidmode', { action: enabled });
  },
});
</script>

<style scoped>
div {
  display: flex;
}
</style>
