<template>
  <div class="gift">
    <div class="subtext">
      <span class="gifter">{{ gifter }}</span>
      gifted<span v-if="!multiMonths">:</span>
      <span v-else class="multi">{{ multiMonths }} months:</span>
    </div>
    <span class="name">{{ giftee }}</span>
    <span class="amount" :class="{glow: glow && months === newSubText || isYear}">
        {{ months }}
      </span>
    <span v-show="months !== newSubText">
        months
      </span>
  </div>
</template>

<script>
export default {
  name: "Gift",
  props: ['data'],
  data() {
    return {
      newSubText: 'NEW',
    }
  },
  computed: {
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
      switch(this.userstate['msg-param-sub-plan']) {
        case "1000": return '(Tier 1)'
        case "2000": return '(Tier 2)'
        case "3000": return '(Tier 3)'
        default: return null
      }
    },
    multiMonths() {
      const months = this.userstate['msg-param-gift-months']
      if (months === true) return null;
      return ` ${months}`
    },
    months() {
      const months = this.data.payload.userstate['msg-param-months']
      if (months === true) return this.newSubText
      return months
    },
    isYear() {
      return this.months % 12 === 0
    },
    years() {
      return this.months / 12 + ' years!'
    },
    glow() {
      return this.$store.state.settings.glow;
    }
  }
}
</script>

<style scoped>
.gift {
  color: gray;
}
.gifter {
  color: #fff;
}
.subtext {
  font-size: 14px;
}
.multi {
  color: #09ff00;
}
</style>
