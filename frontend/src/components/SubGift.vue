<template>
  <div class="gift">
    <div>
      <span class="name">{{ username }}&nbsp;</span>
      <span v-if="isSubGift">gifted:
        <span v-if="giftMultiMonths" class="teal">{{ giftMultiMonths }}</span>
      </span>
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
  </div>
</template>

<script>
import subComp from '@/plugins/sub_computed'

export default {
  name: "SubGift",
  props: ['data'],
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
}
</script>

<style scoped>
.gifter {
  color: #fff;
}

.subtext {
  font-size: 14px;
}

.recipient:hover {
  background-color: #505050;
}

.column > div > div.uncleared .recipient:hover {
  background: rgba(100, 65, 165, 1.0);
}
</style>
