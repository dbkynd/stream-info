<template>
  <div>
    <Date :date="data.createdAt" />
    <div>
      <span class="name">
        {{ data.payload.userstate['display-name'] }}
      </span>
      <span class="amount">
        {{ months }}
      </span>
      <span v-show="months !== 'NEW SUB'">
        months
      </span>
      <span v-show="isYear" class="icons">
        <img src="@/assets/cake.jpg" alt="">
      </span>
    </div>
    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>
    <Icons :userstate="data.payload.userstate"/>
  </div>
</template>

<script>
import Date from '@/components/Date'
import Icons from '@/components/Icons'
import SubMessage from '@/components/SubMessage'

export default {
  name: "Subscription",
  props: ['data'],
  components: {
    Date, Icons, SubMessage
  },
  computed: {
    months() {
      const months = this.data.payload.userstate['msg-param-cumulative-months']
      if (months === true) return 'NEW SUB'
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
}
</style>
