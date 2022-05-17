<template>
  <v-dialog v-model="dialog">
      <v-switch
        v-model="glowNew"
        label="New Sub Glow"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="glowYears"
        label="Year Glow"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="showYears"
        label="Show Years"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="animated"
        label="Animated Emotes"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="expandMassGiftRecipients"
        label="Mass Gifts Expanded"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="animatedCheer"
        label="Animated Cheermotes"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="showCheerValues"
        label="Cheer Values"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="cheerAmounts"
        label="Cheer Amounts"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="showLastGame"
        label="Host - Show Last Game"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="showStreamLength"
        label="Host - Show Stream Length"
        color="secondary"
        hide-details
      />
      <v-switch
        v-model="showStreamTitle"
        label="Host - Show Stream Title"
        color="secondary"
        hide-details
      />
  </v-dialog>
<!--  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        User Settings
      </v-expansion-panel-title>
      <v-expansion-panel-text>
      <v-switch
        v-model="glowNew"
        label="New Sub Glow"
        color="red"
        hide-details
        density="compact"
      />
      <v-switch
        v-model="glowYears"
        label="Year Glow"
        color="red"
        hide-details
        density="compact"
      />
      <v-switch
        v-model="showYears"
        label="Show Years"
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
        <v-switch
          v-model="cheerAmounts"
          label="Cheer Amounts"
          color="red"
          hide-details
          density="compact"
        />

        <v-switch
          v-model="showLastGame"
          label="Show Last Game"
          color="red"
          hide-details
          density="compact"
        />

        <v-switch
          v-model="showStreamLength"
          label="Show Stream Length"
          color="red"
          hide-details
          density="compact"
        />

        </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>-->
</template>

<script>
export default {
  name: "UserSettings",
  computed: {
    dialog: {
      get() {
        return this.$store.state.settingsDialog;
      },
      set(value) {
        this.$store.commit('setSettingsDialog', value)
      }
    },
    glowNew: {
      get() {
        return this.$store.state.settings.glowNew;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { glowNew: value })
      }
    },
    glowYears: {
      get() {
        return this.$store.state.settings.glowYears;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { glowYears: value })
      }
    },
    showYears: {
      get() {
        return this.$store.state.settings.showYears;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { showYears: value })
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
    },
    cheerAmounts: {
      get() {
        return this.$store.state.settings.cheerAmounts;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { cheerAmounts: value })
      }
    },
    showLastGame: {
      get() {
        return this.$store.state.settings.showLastGame;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { showLastGame: value })
      }
    },
    showStreamLength: {
      get() {
        return this.$store.state.settings.showStreamLength;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { showStreamLength: value })
      }
    },
    showStreamTitle: {
      get() {
        return this.$store.state.settings.showStreamTitle;
      },
      set(value) {
        this.$store.dispatch('updateSettings', { showStreamTitle: value })
      }
    }
  }
}
</script>

<style scoped>

</style>
