<template>
  <div class="message" v-html="parsedMessage"></div>
</template>

<script>
export default {
  name: "EmoteMessage",
  props: ['payload'],
  computed: {
    animated() {
      return this.$store.state.settings.animated;
    },
    parsedMessage() {
      const { message, emotes } = this.payload;
      if (!emotes) return message;

      const arr = [];
      for (const key in emotes) {
        arr.push({
          ...emotes[key],
          name: key,
        });
      }

      const emoteArray = [];
      for (const key in emotes) {
        emotes[key].pos.forEach((p) => {
          emoteArray.push(p.first);
        });
      }

      let m = message.split('');
      emoteArray
        .sort((a, b) => b - a)
        .forEach((x) => {
          let i;
          const e = arr.find((y) =>
            y.pos.find((z, index) => {
              if (z.first === x) {
                i = index;
                return true;
              }
              return false;
            }),
          );
          const p = e.pos[i];
          const src = this.animated && e.animated ? e.animated : e.static;
          const img = `<img class="emoticon" src="${src}?q=1" alt="${e.name}" title="${message.slice(p.first, p.last + 1)}"/>`;
          m.splice(p.first, p.last - p.first + 1, img);
        });

      return m.join('');
    }
  }
}
</script>

<style scoped>
</style>
