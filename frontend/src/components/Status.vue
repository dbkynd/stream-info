<template>
    <div class="status_indicators">
  <!--    <div :class="{ enabled: status.clientWs }">Web Socket</div>
      <div :class="{ enabled: status.twitchIrc }">StreamElements</div>
      <div :class="{ enabled: status.seWs }">Twitch Chat</div>-->
      <v-card :class="{ enabled: status.clientWs }"></v-card>
      <div :class="{ enabled: status.twitchIrc }"></div>
      <div :class="{ enabled: status.seWs }"></div>
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
  margin-left: 4px;
}

.status_indicators > div {
  background-color: #b31212;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 6px;
}

.status_indicators > div.enabled {
  background-color: #0f6809;
}
</style>
