<template>
  <div style="display: flex;">
    <v-switch
      v-model="slow"
      label="Slow Mode"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="followers"
      label="Followers Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="subscribers"
      label="Subscribers Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="r9k"
      label="R9K Mode"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="emote"
      label="Emote Only"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="raidMode"
      label="Raid Mode"
      color="red"
      hide-details
      density="compact"
    />
  </div>
</template>

<script>
import {api} from '@/plugins/axios';

export default {
  name: "ChatToggles",
  computed: {
    defaultSlow() {return this.$store.state.settings.defaultSlow || "60"},
    defaultFollowers() {return this.$store.state.settings.defaultFollowers || "10"},
    slow: {
      // false is off
      // "30" is 30 seconds
      get() {
        return this.$store.state.roomstate.slow !== false;
      },
      set(enabled) {
        if (enabled) {
          this.$store.commit('SOCKET_roomstate', {slow: this.defaultSlow})
        } else {
          this.$store.commit('SOCKET_roomstate', {slow: false})
        }
        const message = enabled ? `/slow ${this.defaultSlow}` : '/slowoff'
        api.post('/say', {message}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {slow: !enabled})
        })
      }
    },
    followers: {
      // "-1" is off
      // false is 0 duration
      // "10" is 10 minutes
      get() {
        return this.$store.state.roomstate["followers-only"] !== "-1";
      },
      set(enabled) {
        if (enabled) {
          this.$store.commit('SOCKET_roomstate', {'followers-only': this.defaultFollowers})
        } else {
          this.$store.commit('SOCKET_roomstate', {'followers-only': "-1"})
        }
        const message = enabled ? `/followers ${this.defaultFollowers}` : '/followersoff'
        api.post('/say', {message}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'subs-only': !enabled})
        })
      }
    },
    subscribers: {
      get() {
        // Boolean
        return this.$store.state.roomstate["subs-only"];
      },
      set(enabled) {
        this.$store.commit('SOCKET_roomstate', {'subs-only': enabled})
        const message = enabled ? '/subscribers' : '/subscribersoff'
        api.post('/say', {message}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'subs-only': !enabled})
        })
      }
    },
    r9k: {
      // Boolean
      get() {
        return this.$store.state.roomstate["r9k"];
      },
      set(enabled) {
        this.$store.commit('SOCKET_roomstate', {'r9k': enabled})
        const message = enabled ? '/r9k' : '/r9koff'
        api.post('/say', {message}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'r9k': !enabled})
        })
      }
    },
    emote: {
      // Boolean
      get() {
        return this.$store.state.roomstate["emote-only"];
      },
      set(enabled) {
        this.$store.commit('SOCKET_roomstate', {'emote-only': enabled})
        const message = enabled ? '/emoteonly' : '/emoteonlyoff'
        api.post('/say', {message}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'emote-only': !enabled})
        })
      }
    },
    raidMode: {
      // Boolean
      get() {
        return this.$store.state.appState["raidMode"];
      },
      set(value) {
        this.$store.commit('SOCKET_appState', {'raidMode': value})
        api.post('/command', {'raidMode': value}).catch(() => {
          this.$store.commit('SOCKET_appState', {'raidMode': !value})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
