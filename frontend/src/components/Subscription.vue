<template>
  <div>
    <Timestamp :date="data.createdAt" />
    <div>
      <span class="name">
        {{ data.payload.userstate['display-name'] }}
      </span>
      <span class="amount" :class="{shadow: months === newSubText}">
        {{ months }}
      </span>
      <span v-show="months !== newSubText">
        months
      </span>
      <span v-show="isYear" class="icons">
        <img src="@/assets/cake.svg" alt="">
      </span>
    </div>
    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>
    <Icons :userstate="data.payload.userstate"/>
  </div>
</template>

<script>
import Timestamp from '@/components/Timestamp'
import Icons from '@/components/Icons'
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
    Timestamp, Icons, SubMessage
  },
  computed: {
    months() {
      const months = this.data.payload.userstate['msg-param-cumulative-months']
      if (months === true) return this.newSubText
      return months
    },
    isYear() {
      return this.months % 12 === 0
    }
  },
}
</script>

<style scoped>
.icons img {
  height: 18px;
  position: relative;
  top: 4px;
  margin-left: 2px;
}

.shadow {
  text-shadow:
    0 0 3px #000000,
    0 0 7px #f9d71a
}
</style>
