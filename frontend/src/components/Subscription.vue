<template>
  <div>
    <Timestamp :date="data.createdAt" />

    <SubResub v-if="!isGift" :data="data" />
    <SubGift v-else-if="isGift" :data="data"/>
    <SubFooter :userstate="data.payload.userstate"/>

    <div class="cardFooter">
<!--      <v-img v-show="isYear" class="cake" src="@/assets/cake.svg" alt="" :title="years" />-->
    </div>
  </div>
</template>

<script>
import Timestamp from '@/components/Timestamp'
import SubFooter from '@/components/SubFooter'
import SubResub from '@/components/SubResub'
import SubGift from '@/components/SubGift'

export default {
  name: "Subscription",
  props: ['data'],
  components: {
    Timestamp, SubFooter, SubResub, SubGift
  },
  computed: {
    isGift() {
      return this.data.payload.userstate['msg-id'].includes('gift')
    }
  },
}
</script>
