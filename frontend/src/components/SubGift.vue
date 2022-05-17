<template>
  <div class="gift">
    <div>
      <span class="name">{{ gifter }}&nbsp;</span>
      <span v-if="isSubGift">gifted:
        <span v-if="giftMonths" class="multi">{{ giftMonths }}</span>
      </span>
      <span v-else>
        <span>gifted</span>
        <span class="amount">&nbsp;{{ months }}&nbsp;</span>
        <span v-if="months === 1">sub!</span>
        <span v-else>subs!</span>
      </span>
    </div>
    <div v-if="isSubGift">
      <span class="name">{{ giftee }}</span>
      <span class="amount" :class="{glow}">&nbsp;{{ monthsText }}</span>
      <span v-show="monthsText !== newSubText">&nbsp;months</span>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SubGift",
  props: ['data'],
  data() {
    return {
      newSubText: 'NEW',
    }
  },
  computed: {
    ...mapState(['settings']),
    userstate() {
      return this.data.payload.userstate;
    },
    gifter() {
      return this.userstate['display-name'] || this.userstate['login'];
    },
    giftee() {
      return this.userstate['msg-param-recipient-display-name'] || this.userstate['msg-param-recipient-user-name']
    },
    isSubGift() {
      return this.userstate['msg-id'] === 'subgift';
    },
    months() {
      const months = this.userstate['msg-param-gift-months'] || this.userstate['msg-param-mass-gift-count'];
      if (months === true) return 1;
      return months;
    },
    monthsText() {
      const months = this.userstate['msg-param-months'] || this.userstate['msg-param-mass-gift-count'];
      if (months === true) return this.newSubText;
      return months;
    },
    tier() {
      switch (this.userstate['msg-param-sub-plan']) {
        case "1000":
          return 'Tier 1'
        case "2000":
          return 'Tier 2'
        case "3000":
          return 'Tier 3'
        default:
          return null
      }
    },
    giftMonths() {
      const months = this.userstate['msg-param-gift-months'];
      if (months === true) return null;
      return months + ' months';
    },
    isYear() {
      return this.monthsText % 12 === 0
    },
    years() {
      return this.monthsText / 12 + ' years!'
    },
    glow() {
      return (this.settings.glow && this.monthsText === this.newSubText) || (this.settings.glowYears && this.isYear);
    }
  },
}
</script>

<style scoped>
.gifter {
  color: #fff;
}

.subtext {
  font-size: 14px;
}

.multi {
  color: #51eac8;
}

.recipient:hover {
  background-color: #505050;
}

.column > div > div.uncleared .recipient:hover {
  background: rgba(100, 65, 165, 1.0);
}
</style>
