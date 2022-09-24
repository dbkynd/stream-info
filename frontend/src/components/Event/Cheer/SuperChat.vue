<template>
  <EventCard :data="data">
    <v-row no-gutters align="center">
      <span class="name">{{ username }}</span>
      <span class="superchat-amount ml-2" :class="`amount-${amount}`">
        ${{ dollars }}
      </span>
      <span v-if="sharedEmote" class="sharedEmote ml-2">
        <img :src="sharedEmote" alt="Shared Emote" />
      </span>
    </v-row>
    <template #footer>
      <div class="card-footer"></div>
    </template>
  </EventCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import EventCard from '../EventCard.vue';
import { displayName } from '@/plugins/utils';
import { useStore } from '@/store';
import { Cheer, SuperChatUserState } from '@/types/events';

const store = useStore();

const props = defineProps<{
  data: Cheer;
}>();

const animatedEmotes = computed(() => {
  return store.state.settings.animatedEmotes;
});

const userstate = computed((): SuperChatUserState => {
  return props.data.payload.userstate as SuperChatUserState;
});

const username = computed(() => {
  return displayName(userstate.value['login'], userstate.value['display-name']);
});

const amount = computed(() => {
  return userstate.value['msg-param-amount'];
});

const dollars = computed(() => {
  const bits = userstate.value['msg-param-amount'];
  if (!bits) return '';
  const value = parseInt(bits) / 100;
  if (value % 1 !== 0) {
    return value.toFixed(2);
  } else {
    return value.toString();
  }
});

const sharedEmote = computed((): string | null => {
  const emote = userstate.value['msg-param-emote-id'];
  if (!emote) return null;
  return animatedEmotes.value
    ? `https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/1.0`
    : `https://static-cdn.jtvnw.net/emoticons/v2/${emote}/static/dark/1.0`;
});
</script>

<style scoped>
.superchat-amount {
  height: 22px;
  padding: 2px 15px 2px 15px;
  border-radius: 26px;
  color: black;
  display: flex;
  align-items: center;
}

.amount-100 {
  background-color: #00db84;
}

.amount-500 {
  background-color: #a3c1ff;
}

.amount-1000 {
  background-color: #ff8280;
}

.amount-5000 {
  background-color: #ff75e6;
}

.amount-10000 {
  background-color: #ffb319;
}

.sharedEmote img {
  position: relative;
  top: 3px;
  height: 26px;
  margin: 0;
  padding: 0;
}
</style>
