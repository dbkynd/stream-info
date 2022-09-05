<template>
  <div class="message">
    <template v-for="(fragment, i) in textFragments" :key="i">
      <Emote
        v-if="fragment.isEmote"
        :data="payload.emotes[fragment.text]"
        :name="fragment.text"
      />
      <span v-else class="text-fragment">{{ fragment.text }}</span>
    </template>
  </div>
</template>

<script>
import Emote from '@/components/Emote';
import { decode } from 'html-entities';

export default {
  name: 'EmoteMessage',
  props: ['payload', 'decode'],
  components: { Emote },
  computed: {
    decoded() {
      if (this.decode === true) return decode(this.payload.message);
      return this.payload.message;
    },
    words() {
      if (!this.payload.message) return [];
      return this.decoded.split(' ');
    },
    textFragments() {
      const wordCount = this.words.length;
      if (!wordCount) return this.words;
      const fragments = [];
      let wordFragment = [];

      function addSpace(i) {
        return i !== undefined && i !== wordCount;
      }

      function addTextFragment(i) {
        if (wordFragment.length) {
          if (addSpace(i)) wordFragment.push(' ');
          fragments.push({
            isEmote: false,
            text: wordFragment.join(' '),
          });
          wordFragment = [];
        }
      }

      this.words.forEach((word, i) => {
        if (this.isEmote(word)) {
          addTextFragment(i);
          fragments.push({
            isEmote: true,
            text: word,
          });
          if (addSpace(i)) wordFragment.push(' ');
        } else {
          wordFragment.push(word);
        }
      });
      addTextFragment();
      return fragments;
    },
  },
  methods: {
    isEmote(word) {
      if (!this.payload.emotes) return false;
      return Boolean(this.payload.emotes[word]);
    },
  },
};
</script>

<style scoped></style>
