<template>
  <span class="emoticon">
    <img :src="src" :alt="name" :title="name"/>
    <span v-if="data.source === 'cheermote' && showCheerValues" :class="`tier_${data.tier}`">{{ data.value }}</span>
  </span>
</template>

<script>
export default {
  name: "Emote",
  props: ['data', 'name'],
  computed: {
    showCheerValues() {
      return this.$store.state.settings.showCheerValues;
    },
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

.tier_0 {
  color: #f9d71a;
}

.tier_1 {
  color: #979797;
}

.tier_100 {
  color: #9c3ee8;
}

.tier_1000 {
  color: #1db2a5;
}

.tier_5000 {
  color: #0099fe;
}

.tier_10000 {
  color: #f43021;
}

.tier_100000 {
  color: #ffcb13;
}
</style>
