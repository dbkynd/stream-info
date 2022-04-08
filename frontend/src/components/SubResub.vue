<template>
  <div>
    <div>
      <span class="name">{{ data.payload.userstate['display-name'] }}</span>
      <span class="amount" :class="{glow}">&nbsp;{{ months }}</span>
      <span v-if="months !== newSubText">&nbsp;months</span>
    </div>

    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>
  </div>
</template>

<script>
import SubMessage from '@/components/SubMessage'

export default {
  name: "SubResub",
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
      return this.$store.state.settings.glow && this.months === this.newSubText || this.isYear;
    }
  },
}
</script>

<style scoped>
.cake {
  height: 20px;
}
</style>
