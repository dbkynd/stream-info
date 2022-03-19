<template>
  <div style="display: flex;">
    <v-switch
      v-model="glow"
      label="New Sub Glow"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="animated"
      label="Animated Emotes"
      color="red"
      hide-details
      density="compact"
    />
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  computed: {
    glow: {
      get() {
        return this.$store.state.settings.glow;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { glow: value })
      }
    },
    animated: {
      get() {
        return this.$store.state.settings.animated;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { animated: value })
      }
    }
  }
}
</script>

<style scoped>

</style>
