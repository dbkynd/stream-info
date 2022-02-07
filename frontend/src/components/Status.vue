<template>
  <div class="status">
    <div :class="{ enabled: status.clientWs }"/>
    <div :class="{ enabled: status.twitchIrc }"/>
    <div :class="{ enabled: status.seWs }"/>
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
.status > div {
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 10px;
}

.status > div.enabled {
  background-color: green;
}
</style>
