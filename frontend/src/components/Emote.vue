<template>
  <span class="emoticon">
    <img :src="src" :alt="name" :title="name"/>
  </span>
</template>

<script>
export default {
  name: "Emote",
  props: ['data', 'name'],
  computed: {
    animated() {
      return this.$store.state.settings.animated;
    },
    animatedCheer() {
      return this.$store.state.settings.animatedCheer;
    },
    src() {
      if (this.data.source === 'cheermote') {
        return this.animatedCheer && this.data.animated ? this.data.animated : this.data.static;
      } else {
        return this.animated && this.data.animated ? this.data.animated : this.data.static;
      }
    },
  }
}
</script>

<style scoped>
.emoticon  img {
  height: 28px;
  position: relative;
  top: 4px;
  margin: -5px 1px;
}
</style>
