<template>
  <div>

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
      <span v-show="isYear" class="cake">
        <img src="@/assets/cake.svg" alt="">
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

.cake img {
  height: 18px;
  position: relative;
  top: 4px;
}
</style>
