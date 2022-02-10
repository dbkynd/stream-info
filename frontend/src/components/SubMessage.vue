<template>
  <div>
    {{ parsedMessage }}
  </div>
</template>

<script>
export default {
  name: "TwitchMessage",
  props: ['payload'],
  computed: {
    parsedMessage() {
      return this.payload.message;
    }
  }
}
</script>

<style scoped>

</style>
