<template>
  <div class="container">
    <v-row no-gutters align="center">
      <h1>USER SETTINGS</h1>
      <v-spacer/>
      <v-btn @click="home" rounded="false" color="primary" icon size="small">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-row>
    <div v-show="!loading">
      <v-row>
        <v-col cols="6">
          <h3>Subscriptions:</h3>
          <v-row>
            <v-col cols="4">
              <v-switch
                v-model="glowNew"
                label="New Sub Glow"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="glowYears"
                label="Anniversary Glow"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="showYears"
                label="Show Anniversary in Years"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="showPaidUpgrades"
                label="Show Paid Upgrades"
                color="secondary"
                hide-details
              />
            </v-col>
            <v-col cols="8">
              <div class="column">
                <div>
                  <Subscription
                    v-for="subscription in subscriptions"
                    :key="subscription._id"
                    :class="{uncleared: !subscription.cleared}"
                    :data="subscription"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col  cols="6">
          <h3>Emotes:</h3>
          <v-row>
            <v-col cols="4">
              <v-switch
                v-model="animated"
                label="Animated Emotes"
                color="secondary"
                hide-details
              />
            </v-col>
            <v-col cols="8">
              <div class="column">
                <div>
                  <Subscription
                    v-for="subscription in [settings.animatedEmote]"
                    :key="subscription._id"
                    :class="{uncleared: !subscription.cleared}"
                    :data="subscription"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
          <h3>Cheers:</h3>
          <v-row>
            <v-col cols="4">
              <v-switch
                v-model="showCheerValues"
                label="Show Bit Values"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="cheerAmounts"
                label="Show Cheer $ Amount"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="animatedCheer"
                label="Animated Cheermotes"
                color="secondary"
                hide-details
              />
            </v-col>
            <v-col cols="8">
              <div class="column">
                <div>
                  <Cheer
                    v-for="cheer in [settings.cheer, settings.largeCheer]"
                    :key="cheer._id"
                    :class="{uncleared: !cheer.cleared}"
                    :data="cheer"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
          <h3>Hosts:</h3>
          <v-row>
            <v-col cols="4">
              <v-switch
                v-model="showLastGame"
                label="Show Game Title"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="showStreamTitle"
                label="Show Stream Title"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="showStreamLength"
                label="Show Stream Length"
                color="secondary"
                hide-details
              />
            </v-col>
            <v-col cols="8">
              <div class="column">
                <div>
                  <Host
                    v-for="host in [settings.host]"
                    :key="host._id"
                    :class="{uncleared: !host.cleared}"
                    :data="host"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mt-4"></v-divider>
      <v-row>
        <v-col cols="6" >
          <h3>Chat Toggle Durations:</h3>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="defaultSlow" label="Slow Mode (Seconds)" type="number" min="1"/>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="defaultFollowers" label="Follower Only (Minutes)" type="number" min="0"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col  cols="6" >
          <h3>Toast Notifications:</h3>
          <v-row>
            <v-col cols="4">
              <v-switch
                v-model="showRoomstateToasts"
                label="Show Roomstate Toasts"
                color="secondary"
                hide-details
              />
              <v-switch
                v-model="showRaidmodeToasts"
                label="Show Raidmode Toasts"
                color="secondary"
                hide-details
              />
            </v-col>
            <v-col cols="3" class="toast-duration">
              <v-text-field v-model="toastDuration" label="Toast Duration (ms)" type="number" min="0"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Subscription from '@/components/Subscription'
import Cheer from '@/components/Cheer'
import settings from '@/examples'
import Host from '@/components/Host'
import {api} from "@/plugins/axios";

export default {
  name: "Settings",
  components: {Subscription, Cheer, Host},
  data() {
    return {
      loading: true,
      settings,
      subscriptions: [
        settings.newSub,
        settings.sub,
        settings.anniversary,
        settings.giftSub,
        settings.multiMonthGift,
        settings.massGift,
        settings.paidUpgrade.paidUpgrade,
        settings.paidUpgrade.primepaidupgrade
      ],
    }
  },
  created() {
    if (!this.$store.settings) {
      api.get('/user/settings')
        .then(({data}) => {
          this.$store.commit('setSettings', data);
          this.loading = false
        })
        .catch(() => {
          window.location.href = '/api/auth/login';
        })
    } else {
      this.loading = false
    }
  },
  mounted() {
    this.slow = this.defaultSlow
  },
  computed: {
    defaultSlow: {
      get() {
        return this.$store.state.settings.defaultSlow || "60"
      },
      set(value) {
        this.$store.dispatch('updateSettingsWithCooldown', {defaultSlow: value})
      },
    },
    defaultFollowers: {
      get() {
        return this.$store.state.settings.defaultFollowers || "10"
      },
      set(value) {
        this.$store.dispatch('updateSettingsWithCooldown', {defaultFollowers: value})
      },
    },
    glowNew: {
      get() {
        return this.$store.state.settings.glowNew;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {glowNew: value})
      }
    },
    glowYears: {
      get() {
        return this.$store.state.settings.glowYears;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {glowYears: value})
      }
    },
    showYears: {
      get() {
        return this.$store.state.settings.showYears;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showYears: value})
      }
    },
    animated: {
      get() {
        return this.$store.state.settings.animated;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {animated: value})
      }
    },
    animatedCheer: {
      get() {
        return this.$store.state.settings.animatedCheer;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {animatedCheer: value})
      }
    },
    showCheerValues: {
      get() {
        return this.$store.state.settings.showCheerValues;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showCheerValues: value})
      }
    },
    cheerAmounts: {
      get() {
        return this.$store.state.settings.cheerAmounts;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {cheerAmounts: value})
      }
    },
    showLastGame: {
      get() {
        return this.$store.state.settings.showLastGame;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showLastGame: value})
      }
    },
    showStreamLength: {
      get() {
        return this.$store.state.settings.showStreamLength;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showStreamLength: value})
      }
    },
    showStreamTitle: {
      get() {
        return this.$store.state.settings.showStreamTitle;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showStreamTitle: value})
      }
    },
    showPaidUpgrades: {
      get() {
        return this.$store.state.settings.showPaidUpgrades;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showPaidUpgrades: value})
      }
    },
    showRoomstateToasts: {
      get() {
        return this.$store.state.settings.showRoomstateToasts;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showRoomstateToasts: value})
      }
    },
    showRaidmodeToasts: {
      get() {
        return this.$store.state.settings.showRaidmodeToasts;
      },
      set(value) {
        this.$store.dispatch('updateSettings', {showRaidmodeToasts: value})
      }
    },
    toastDuration: {
      get() {
        return this.$store.state.settings.toastDuration || "5000"
      },
      set(value) {
        this.$store.dispatch('updateSettingsWithCooldown', {toastDuration: value})
      },
    },
  },
  methods: {
    home() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.column {
  width: 100%;
  height: auto;
  padding-left: 0;
}

.column > div > div:nth-child(1) {
  border-left: 8px solid #3d7ba6;
}

h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}

</style>
