<template>
  <div class="host">
    <Timestamp :date="data.createdAt"/>
    <div>
      <span class="name">{{ username }}&nbsp;</span>
      <div style="display: inline-block">
        {{ data.payload.raid ? 'raided' : 'hosted' }} with
        <span class="amount">{{ data.payload.viewers }}</span>
        <span>&nbsp;viewers</span>
      </div>
    </div>
    <div class="subtext">
      <span v-if="displayStreamLength">{{ data.payload.streamLength }}</span>
      <span v-if="useSpacer"> - </span>
      <span v-if="displayLastGame">{{ data.payload.game }}</span>
      <div v-if="data.payload.title && showStreamTitle">{{data.payload.title}}</div>
    </div>
    <div class="cardFooter"></div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";
import {mapState} from 'vuex';
import { displayName } from '@/plugins/utils'

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
      showStreamTitle: state => state.settings.showStreamTitle,
    }),
    username() {
      return displayName(this.data.payload.username, this.data.payload.displayName);
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
</style>
