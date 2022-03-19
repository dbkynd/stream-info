<template>
  <v-footer fixed padless bottom width="100%" :class="{expanded: expanded}" @mouseleave="mouseleave" @mouseenter="mouseenter">
    <v-row v-if="!expanded" no-gutters>
      <v-col cols="4">
        <v-row no-gutters>
          <Status/>
        </v-row>
      </v-col>
      <v-col cols-="4">
        <v-row justify="center">
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

    <v-container v-else>
      <v-row  justify="center">
        <v-col cols="12">
          <div class="chevron" @click="expanded = !expanded">
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </v-col>
      </v-row>
      <v-row class="outline">
        <v-col cols="12">
          <v-btn color="pink" @click="openSusFollowersPage" append-icon="mdi-open-in-new">Sus Follower Terms</v-btn>
          <v-btn color="blue" @click="clearAll" append-icon="mdi-notification-clear-all">Clear All</v-btn>
          <v-btn color="red-darken-2" @click="logout" append-icon="mdi-logout">Logout</v-btn>
        </v-col>
      </v-row>
      <v-row class="outline">
        <v-col cols="12">
          <Hours/>
        </v-col>
      </v-row>
      <v-row class="outline">
        <v-col cols="12">
          <ChatToggles/>
        </v-col>
      </v-row>
      <v-row class="outline">
        <v-col cols="12">
          <UserSettings/>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import Hours from '@/components/Hours'
import {api} from '@/plugins/axios'
import Status from '@/components/Status';
import Multi from '@/components/Multi';
import ChatToggles from '@/components/ChatToggles';
import UserSettings from '@/components/UserSettings'

export default {
  name: "Footer",
  components: {
    Hours,
    Status,
    Multi,
    ChatToggles,
    UserSettings,
  },
  data() {
    return {
      expanded: false,
      closeTimer: null,
    }
  },
  methods: {
    logout() {
      window.location.href = '/api/auth/logout';
    },
    clearAll() {
      this.$store.commit('clearAll');
      api.post('/clear/all').catch();
    },
    mouseleave() {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, 500)
    },
    close() {
      this.expanded = false
    },
    mouseenter() {
      if (this.closeTimer) clearTimeout(this.closeTimer);
    },
    openSusFollowersPage() {
      window.open('/terms', '_blank')
    }
  }
}
</script>

<style scoped>
.v-footer {
  background: #232426;
  opacity: 0.95;
  padding-left: 0;
  padding-right: 0;
  z-index: 3;
}

.chevron {
  cursor: pointer;
  position: absolute;
  top: 0;
}

.outline {
  border: 1px solid grey;
  border-radius: 5px;
}
</style>
