<template>
  <div class="message">
    <span v-for="(word, i) in messageArr" :key="i">
      <Emote v-if="isEmote(word)" :data="payload.emotes[word]" :name="word"/>
      <span v-else>{{ word }}</span>
      <span v-if="i < messageArr.length">{{ " " }}</span>
    </span>
  </div>
</template>

<script>
import Emote from '@/components/Emote';

export default {
  name: "EmoteMessage",
  props: ['payload'],
  components: {Emote},
  computed: {
    messageArr() {
      if (!this.payload.message) return []
      return this.payload.message.split(' ');
    },
  },
  methods: {
    isEmote(word) {
      if (!this.payload.emotes) return false;
      return Boolean(this.payload.emotes[word]);
    },
  }
}
</script>

<style scoped>
</style>
