<template>
  <div>
    <Timestamp :date="data.createdAt" />
    <Subscription v-if="!isGift" :data="data" />
    <Gift v-else-if="isGift" :data="data"/>
    <SubFooter :userstate="data.payload.userstate"/>
  </div>
</template>

<script>
import Timestamp from '@/components/Timestamp'
import SubFooter from '@/components/SubFooter'
import Subscription from '@/components/Subscription'
import Gift from '@/components/Gift'

export default {
  name: "SubEvent",
  props: ['data'],
  components: {
    Timestamp, SubFooter, Subscription, Gift
  },
  computed: {
    isGift() {
      return this.data.payload.userstate['msg-id'].includes('gift')
    }
  },
}
</script>
