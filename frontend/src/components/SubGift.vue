<template>
  <div class="gift">
    <div>
      <span class="name">{{ gifter }}&nbsp;</span>
      <span v-if="!multiMonths">gifted:</span>
      <span v-else>
        <span>gifted</span>
        <span class="amount">&nbsp;{{ multiMonths }}&nbsp;</span>
        <span>subs!</span>
      </span>
    </div>
    <div v-if="multiMonths">
      <div class="subtext">
        {{ tier }}
        <span v-if="giftedMonths"> for <span class="multi">{{giftedMonths}}</span></span>
      </div>
      <v-divider v-if="recipients.length"  class="my-1"/>
      <div style="width: 100%; height: 15px; text-align: center; background-color:#575757;" @click="showRecipients = !showRecipients">
        <v-icon v-if="!showRecipients" style="position: relative; bottom: 6px;" color="white">mdi-chevron-down</v-icon>
        <v-icon v-else style="position: relative; bottom: 6px;" color="white">mdi-chevron-up</v-icon>
      </div>
    </div>
    <div v-if="userstate['msg-id'] === 'subgift'">
      <span class="name">{{ giftee }}</span>
      <span class="amount" :class="{glow}">&nbsp;{{ months }}</span>
      <span v-show="months !== newSubText">&nbsp;months</span>
    </div>
    <div v-if="recipients.length" class="subtext">
      <div v-if="false">
        <div v-for="recipient in recipients" :key="recipient.id" class="recipient">
          <span class="name subtext">{{ recipient['msg-param-recipient-display-name'] }}</span>
          <span class="amount subtext">&nbsp;{{ monthsText(recipient['msg-param-months']) }}</span>
        </div>
      </div>

      <div v-if="true">
        <div v-if="showRecipients">
          <div v-for="recipient in recipients" :key="recipient.id" class="recipient">
            <span class="name subtext">{{ recipient['msg-param-recipient-display-name'] }}</span>
            <span class="amount subtext">&nbsp;{{ monthsText(recipient['msg-param-months']) }}</span>
          </div>
        </div>
      </div>
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
      showRecipients: false,
    }
  },
  computed: {
    ...mapState(['settings']),
    recipients() {
      const array = this.data.payload.recipients || [];
      return array.sort((a, b) => {
        const c = a['msg-param-recipient-user-name'];
        const d = b['msg-param-recipient-user-name'];
        if (c < d) return -1;
        if (c > d) return 1;
        return 0;
      })
    },
    userstate() {
      return this.data.payload.userstate;
    },
    gifter() {
      return this.userstate['display-name'] || this.userstate.login;
    },
    giftee() {
      return this.userstate['msg-param-recipient-display-name'] || this.userstate['msg-param-recipient-user-name']
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
    multiMonths() {
      const months = this.userstate['msg-param-gift-months'] || this.userstate['msg-param-mass-gift-count'];
      if (months === true) return 1;
      return months;
    },
    giftedMonths() {
      if (!this.recipients.length) return null;
      const months = this.recipients[0]['msg-param-gift-months']
      if (months === true) return null;
      return months + ' months';
    },
    months() {
      const months = this.userstate['msg-param-months'] || this.userstate['msg-param-mass-gift-count'];
      if (months === true) return this.newSubText;
      return months;
    },
    isYear() {
      return this.months % 12 === 0
    },
    years() {
      return this.months / 12 + ' years!'
    },
    glow() {
      return (this.settings.glow && this.months === this.newSubText) || (this.settings.glowYears && this.isYear);
    }
  },
  methods: {
    monthsText(value) {
      if (value === true) return this.newSubText;
      return value;
    },
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
