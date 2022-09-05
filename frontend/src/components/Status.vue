<template>
  <v-row no-gutters align="center">
    <div class="status_indicators">
      <div :class="{ enabled: status.clientWs }" title="Backend WebSocket"></div>
      <div :class="{ enabled: status.twitchIrc }" title="Twitch Chat"></div>
      <div :class="{ enabled: status.seWs }" title="StreamElements WebSocket"></div>
    </div>
    <div class="roomstate">
      {{ states }}
    </div>
  </v-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Status",
  computed: {
    ...mapState(['roomstate', 'appState']),
    status() {
      return this.$store.state.appState;
    },
    slow() {
      const slow = this.roomstate['slow']
      return slow === false ? null : `Slow: ${slow}`
    },
    followers() {
      const followers = this.roomstate['followers-only']
      return followers === "-1" ? null : `Followers: ${followers === false ? 0 : followers}m`;
    },
    sub() {
      const sub = this.roomstate['subs-only']
      return sub === false ? null : 'Sub'
    },
    r9k() {
      const r9k = this.roomstate['r9k']
      return r9k === false ? null : 'r9k'
    },
    emote() {
      const emote = this.roomstate['emote-only']
      return emote === false ? null : 'EmoteOnly'
    },
    raidmode() {
      const raidmode = this.appState.raidmode
      return raidmode === false ? null : 'Raidmode'
    },
    states() {
      const arr = [this.slow, this.sub, this.followers, this.r9k, this.emote, this.raidmode]
      return `[${arr.filter(x => x).join('|')}]`;
    }
  },
}
</script>

<style scoped>
.status_indicators {
  display: flex;
  align-items: center;
  padding: 4px 0 4px;
  margin-left: 8px;
}

.status_indicators > div {
  background-color: #b31212;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 6px;
}

.status_indicators > div.enabled {
  background-color: #397441;
}

.roomstate {
  font-size: 14px;
  color: #bababa;
}
</style>
