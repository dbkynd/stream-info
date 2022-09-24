<template>
  <EventCard :data="data">
    <v-row no-gutters align="center">
      <span class="name">{{ username }}</span>
      <span class="superchat-amount mx-2" :class="`amount-${amount}`">
        ${{ dollars }}
      </span>
      <EmoteImg
        v-if="sharedEmote"
        class="sharedEmote"
        :data="sharedEmote"
        name="sharedEmote"
      />
    </v-row>
    <template #footer>
      <div class="card-footer"></div>
    </template>
  </EventCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import EventCard from '../EventCard.vue';
import EmoteImg from '@/components/EmoteImg.vue';
import { displayName } from '@/plugins/utils';
import { Cheer, Emote, SuperChatUserState } from '@/types/events';

const props = defineProps<{
  data: Cheer;
}>();

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

const sharedEmote = computed((): Emote | null => {
  const emote = userstate.value['msg-param-emote-id'];
  if (!emote) return null;
  return {
    source: 'twitch',
    animated: `https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/1.0`,
    static: `https://static-cdn.jtvnw.net/emoticons/v2/${emote}/static/dark/1.0`,
  };
});
</script>

<style scoped>
.superchat-amount {
  height: 24px;
  padding: 2px 12px 2px 12px;
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
</style>
