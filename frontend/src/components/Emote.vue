<template>
  <img class="emoticon" :src="src" :alt="name" :title="name"/>
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

</style>
