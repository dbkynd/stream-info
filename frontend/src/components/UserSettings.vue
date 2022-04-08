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
    <v-switch
      v-model="animatedCheer"
      label="Animated Cheermotes"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="showCheerValues"
      label="Cheer Values"
      color="red"
      hide-details
      density="compact"
    />
    <v-switch
      v-model="expandMassGiftRecipients"
      label="Mass Gifts Expanded"
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
    },
    animatedCheer: {
      get() {
        return this.$store.state.settings.animatedCheer;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { animatedCheer: value })
      }
    },
    expandMassGiftRecipients: {
      get() {
        return this.$store.state.settings.expandMassGiftRecipients;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { expandMassGiftRecipients: value })
      }
    },
    showCheerValues: {
      get() {
        return this.$store.state.settings.showCheerValues;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { showCheerValues: value })
      }
    }
  }
}
</script>

<style scoped>

</style>
