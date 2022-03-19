<template>
  <div class="status">
<!--    <div :class="{ enabled: status.clientWs }">Web Socket</div>
    <div :class="{ enabled: status.twitchIrc }">StreamElements</div>
    <div :class="{ enabled: status.seWs }">Twitch Chat</div>-->
    <div :class="{ enabled: status.clientWs }"></div>
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
.status {
  width: 100%;
  display: flex;
  margin-left: 8px;
}

.status > div {
  background-color: red;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 5px;
  /*font-size: 11px;
  padding: 2px 10px*/
}

.status > div.enabled {
  background-color: #19820e;
}
</style>
