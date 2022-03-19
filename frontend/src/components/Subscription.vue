<template>
  <div>
    <div>
      <span class="name">
        {{ data.payload.userstate['display-name'] }}
      </span>
      <span class="amount" :class="{shadow: months === newSubText || isYear}">
        {{ months }}
      </span>
      <span v-show="months !== newSubText">
        months
      </span>
    </div>

    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>

    <div class="cardFooter">
      <v-img v-show="isYear" class="cake" src="@/assets/cake.svg" alt="" :title="years" />
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
    }
  },
}
</script>

<style scoped>
.shadow {
  text-shadow:
    0 0 3px #000000,
    0 0 7px #f9d71a
}

.cake {
  height: 20px;
}
</style>
