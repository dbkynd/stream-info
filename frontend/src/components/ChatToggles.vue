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
    slow: {
      get() {
        // false is off
        // "30" is 30 seconds
        return this.$store.state.roomstate.slow !== false;
      },
      set(value) {
        console.log(value)
      }
    },
    followers: {
      get() {
        // "-1" is off
        // false is 0 duration
        // "10" is 10 minutes
        return this.$store.state.roomstate["followers-only"] !== "-1";
      },
      set(value) {
        const current = this.$store.state.roomstate["followers-only"];
        console.log(value, current)
      }
    },
    subscribers: {
      get() {
        // Boolean
        return this.$store.state.roomstate["subs-only"];
      },
      set(value) {
        this.$store.commit('SOCKET_roomstate', {'subs-only': value})
        api.post('/command/se', {'subs-only': value}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'subs-only': !value})
        })
      }
    },
    r9k: {
      get() {
        // Boolean
        return this.$store.state.roomstate["r9k"];
      },
      set(value) {
        this.$store.commit('SOCKET_roomstate', {'r9k': value})
        api.post('/command/se', {'r9k': value}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'r9k': !value})
        })
      }
    },
    emote: {
      get() {
        // Boolean
        return this.$store.state.roomstate["emote-only"];
      },
      set(value) {
        this.$store.commit('SOCKET_roomstate', {'emote-only': value})
        api.post('/command/se', {'emote-only': value}).catch(() => {
          this.$store.commit('SOCKET_roomstate', {'emote-only': !value})
        })
      }
    },
    raidMode: {
      get() {
        // Boolean
        return this.$store.state.appState["raidMode"];
      },
      set(value) {
        this.$store.commit('SOCKET_appState', {'raidMode': value})
        api.post('/command/se', {'raidMode': value}).catch(() => {
          this.$store.commit('SOCKET_appState', {'raidMode': !value})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
