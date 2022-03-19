<template>
  <div>
    <div>
      <span class="name">
        {{ data.payload.userstate['display-name'] }}
      </span>
      <span class="amount" :class="{glow: glow && months === newSubText || isYear}">
        {{ months }}
      </span>
      <span v-show="months !== newSubText">
        months
      </span>
    </div>

    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>
  </div>
</template>

<script>
import SubMessage from '@/components/SubMessage'

export default {
  name: "Subscription",
  props: ['data'],
  data() {
    return {
      newSubText: 'NEW',
    }
  },
  components: {
    SubMessage
  },
  computed: {
    months() {
      const months = this.data.payload.userstate['msg-param-cumulative-months']
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
  },
}
</script>

<style scoped>
.cake {
  height: 20px;
}
</style>
