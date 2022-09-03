<template>
  <div class="gift">
    <div>
      <span class="name">{{ username }}&nbsp;</span>
      <span v-if="isSubGift">gifted<span v-if="giftMultiMonths" class="multiMonths">&nbsp;{{ giftMultiMonths }}</span>:</span>
      <span v-else>
        <span>gifted</span>
        <span class="amount">&nbsp;{{ massGiftMonths }}&nbsp;</span>
        <span v-if="massGiftMonths === 1">sub!</span>
        <span v-else>subs!</span>
      </span>
    </div>
    <div v-if="isSubGift">
      <span class="name">{{ giftee }}</span>
      <span class="amount" :class="{glow}">&nbsp;{{ months }}</span>
      <span v-show="months !== newSubText">&nbsp;months</span>
    </div>
    <div v-if="showRecipients" class="recipients">
      <div class="expander ml-1">
        <v-icon v-if="!expanded" size="20" @click="expanded = !expanded">mdi-chevron-down-circle</v-icon>
        <v-icon v-else size="20" @click="expanded = !expanded">mdi-chevron-up-circle</v-icon>
      </div>
      <div v-if="expanded" class="my-2">
        <div v-for="recipient in data.recipients" :key="recipient" class="recipient">
          <span class="name">{{ recipientName(recipient) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subComp from '@/plugins/sub_computed'

export default {
  name: "SubGift",
  props: ['data'],
  data() {
    return {
      expanded: this.$store.state.settings.expandMassGiftRecipients || false,
    }
  },
  computed: {
    ...subComp,
    userstate() {
      return this.data.payload.userstate;
    },
    giftee() {
      return this.userstate['msg-param-recipient-display-name'] || this.userstate['msg-param-recipient-user-name']
    },
    isSubGift() {
      return this.userstate['msg-id'] === 'subgift';
    },
    massGiftMonths() {
      const months = this.userstate['msg-param-mass-gift-count'];
      if (months === true) return 1;
      return months;
    },
    giftMultiMonths() {
      const months = this.userstate['msg-param-gift-months'];
      if (months === true) return null;
      return months + ' months';
    },
  },
  methods: {
    recipientName(userstate) {
      const login = userstate['msg-param-recipient-user-name'];
      const displayName = userstate['msg-param-recipient-display-name'];
      if (!displayName) return login;
      if (login.toLowerCase() !== displayName.toLowerCase()) return login;
      return displayName;
    },
  }
}
</script>

<style scoped>
.gifter {
  color: #fff;
}

.subtext {
  font-size: 14px;
}

.recipient {
  background-color: red;
}

.recipient:hover {
  background-color: #505050;
}

.column > div > div.uncleared .recipient:hover {
  background: rgba(100, 65, 165, 1.0);
}

.expander .v-icon {
  cursor: pointer;
  position: relative;
  right: 4px;
}

.expander, .v-icon, .multiMonths {
  color: #f9d71a;
}

.recipients .name {
  font-size: 1.0em;
}
</style>
