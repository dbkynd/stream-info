<template>
  <div class="host">
    <Timestamp :date="data.createdAt"/>
    <div>
      <span class="name">{{ name }}</span>
      {{ data.payload.raid ? 'raided' : 'hosted' }} with
      <span class="amount">{{ data.payload.viewers }}</span>
      viewers
    </div>
    <div class="subtext">
      <span v-if="displayStreamLength">{{ data.payload.streamLength }}</span>
      <span v-if="useSpacer"> - </span>
      <span v-if="displayLastGame">{{ data.payload.game }}</span>
    </div>
    <div class="cardFooter"></div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";
import { mapState } from 'vuex';

export default {
  name: "Host",
  props: ['data'],
  components: {
    Timestamp,
  },
  computed: {
    ...mapState({
      showLastGame: state => state.settings.showLastGame,
      showStreamLength: state => state.settings.showStreamLength,
    }),
    name() {
      return this.data.payload.displayName ||   this.data.payload.username
    },
    displayLastGame() {
      return this.showLastGame && this.data.payload.game;
    },
    displayStreamLength() {
      return this.showStreamLength && this.data.payload.streamLength;
    },
    useSpacer() {
      return this.displayStreamLength && this.displayLastGame;
    },
  },
}
</script>

<style scoped>
.subtext {
  font-size: 0.8rem;
}
</style>
