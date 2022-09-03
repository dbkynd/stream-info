<template>
    <div class="status_indicators">
      <div :class="{ enabled: status.clientWs }" title="Backend WebSocket"></div>
      <div :class="{ enabled: status.twitchIrc }" title="Twitch Chat"></div>
      <div :class="{ enabled: status.seWs }" title="StreamElements WebSocket"></div>
    </div>
</template>

<script>
export default {
  name: "Status",
  computed: {
    status() {
      return this.$store.state.appState;
    }
  }
}
</script>

<style scoped>
.status_indicators {
  display:flex;
  align-items:center;
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
</style>
