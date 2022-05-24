<template>
  <div>
    <span class="name">{{ username }}&nbsp;</span>
    <div class="subtext">
      <template v-if="userstate['msg-id'] === 'primepaidupgrade'">
        upgraded from a prime sub to a <span style="color: white;">{{tier}}</span> sub.
      </template>
      <template v-else>
        is continuing the gift sub they got from <span style="color: white;">{{sender}}</span>.
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaidUpgrade",
  props: ['data'],
  computed: {
    userstate() {
      return this.data.payload.userstate;
    },
    username() {
      return this.userstate['display-name'] || this.userstate['login'];
    },
    tier() {
      switch(this.userstate['msg-param-sub-plan']) {
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
      return this.userstate['msg-param-sender-name'] || this.userstate['msg-param-sender-login'] || 'Anonymous';
    }
  }
}
</script>

<style scoped>

</style>
