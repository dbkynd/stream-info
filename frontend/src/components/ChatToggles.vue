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
        const message = enabled ? `/slow ${this.defaultSlow}` : '/slowoff'
        api.post('/say', {message})
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
        const message = enabled ? `/followers ${this.defaultFollowers}` : '/followersoff'
        api.post('/say', {message})
      }
    },
    subscribers: {
      get() {
        // Boolean
        return this.$store.state.roomstate["subs-only"];
      },
      set(enabled) {
        const message = enabled ? '/subscribers' : '/subscribersoff'
        api.post('/say', {message})
      }
    },
    r9k: {
      // Boolean
      get() {
        return this.$store.state.roomstate["r9k"];
      },
      set(enabled) {
        const message = enabled ? '/uniquechat' : '/uniquechatoff'
        api.post('/say', {message})
      }
    },
    emote: {
      // Boolean
      get() {
        return this.$store.state.roomstate["emote-only"];
      },
      set(enabled) {
        const message = enabled ? '/emoteonly' : '/emoteonlyoff'
        api.post('/say', {message})
      }
    },
    raidMode: {
      // Boolean
      get() {
        return this.$store.state.appState["raidMode"];
      },
      set(value) {
        api.post('/command', {'raidMode': value})
      }
    }
  }
}
</script>

<style scoped>

</style>
