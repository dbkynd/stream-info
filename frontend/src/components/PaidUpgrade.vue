<template>
  <div>
    <span class="name">{{ username }}&nbsp;</span>
    <div class="subtext">
      <template v-if="userstate['msg-id'] === 'primepaidupgrade'">
        upgraded from a <span class="prime">prime sub</span> to a <span class="white">{{ tier }}</span> sub.
      </template>
      <template v-else>
        is continuing the gift sub they got from <span class="white">{{ sender }}</span>.
      </template>
    </div>
  </div>
</template>

<script>
import {displayName} from '@/plugins/utils'

export default {
  name: "PaidUpgrade",
  props: ['data'],
  computed: {
    userstate() {
      return this.data.payload.userstate;
    },
    username() {
      return displayName(this.userstate['login'], this.userstate['display-name']);
    },
    tier() {
      switch (this.userstate['msg-param-sub-plan']) {
        case '1000':
          return 'Tier 1';
        case '2000':
          return 'Tier 2';
        case '3000':
          return 'Tier 3';
        default:
          return null;
      }
    },
    sender() {
      return displayName(this.userstate['msg-param-sender-login'] || 'Anonymous', this.userstate['msg-param-sender-name']);
    }
  }
}
</script>

<style scoped>
.white {
  color: white;
}
.prime {
  color: #0382B8;
}
</style>
