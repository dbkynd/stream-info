<template>
  <v-footer fixed padless bottom width="100%" :class="{expanded: expanded}" @mouseleave="mouseleave" @mouseenter="mouseenter"  class="ma-0 pa-1">
    <v-row v-if="!expanded" no-gutters>
      <v-col cols="4">
        <v-row no-gutters>
          <Status/>
        </v-row>
      </v-col>
      <v-col cols-="4">
        <v-row no-gutters justify="center" class="d-flex align-center">
          <div class="chevron" @click="expanded = !expanded">
            <v-icon>mdi-chevron-up</v-icon>
          </div>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row no-gutters>
          <v-spacer/>
          <Multi/>
        </v-row>
      </v-col>
    </v-row>

    <v-container v-else class="mt-0 pt-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters justify="center" class="d-flex align-center ma-0 pa-0 mb-3">
            <div class="chevron" @click="expanded = !expanded">
              <v-icon>mdi-chevron-down</v-icon>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="outline elevation-1">
            <Hours/>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="outline elevation-1">
            <ChatToggles/>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <v-card class="outline elevation-1">
              <v-row justify="space-around" no-gutters>
                <v-btn color="pink-darken-2" @click="openSusFollowersPage" append-icon="mdi-open-in-new">Sus Follower Terms</v-btn>
                <v-btn color="blue" @click="clearAll" append-icon="mdi-notification-clear-all">Clear All</v-btn>
                <v-btn color="purple" @click="openSettingsPage" append-icon="mdi-cog">Settings</v-btn>
                <v-btn color="red-darken-2" @click="logout" append-icon="mdi-logout">Logout</v-btn>
              </v-row>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import Hours from '@/components/Hours'
import Status from '@/components/Status';
import Multi from '@/components/Multi';
import ChatToggles from '@/components/ChatToggles';

export default {
  name: "Footer",
  components: {
    Hours,
    Status,
    Multi,
    ChatToggles,
  },
  data() {
    return {
      expanded: false,
      closeTimer: null,
      settingsDialog: false,
    }
  },
  methods: {
    logout() {
      window.location.href = '/api/auth/logout';
    },
    clearAll() {
      this.$store.commit('lists/clearAll');
    },
    mouseleave() {
      this.closeTimer = setTimeout(() => {
        this.closeFooter();
      }, 600)
    },
    closeFooter() {
      this.expanded = false
    },
    mouseenter() {
      if (this.closeTimer) clearTimeout(this.closeTimer);
    },
    openSusFollowersPage() {
      this.$router.push('terms');
    },
    openSettingsPage() {
      this.$router.push('settings');
    },
  }
}
</script>

<style scoped>
.v-footer {
  background: #39393d;
  padding-left: 0;
  padding-right: 0;
  z-index: 3;
}

.chevron {
  cursor: pointer;
}

.outline {
  background: #323236;
  border: 1px solid #2c2c2f;
  border-radius: 5px;
  padding: 10px;
  position: relative;
}

</style>
