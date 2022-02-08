<template>
  <div>
    <Date :date="data.createdAt" />
    <div>
      <span class="name">
        {{ data.payload.userstate['display-name'] }}
      </span>
      <span class="amount">
        {{ data.payload.userstate['msg-param-cumulative-months'] }}
      </span>
      <span>
        months
      </span>
      <span v-show="isYear" class="icons">
        <img src="@/assets/cake.jpg" alt="">
      </span>
    </div>
    <div class="message">
      {{ data.payload.message }}
    </div>
    <Icons :userstate="data.payload.userstate"/>
  </div>
</template>

<script>
import Date from '@/components/Date'
import Icons from '@/components/Icons'

export default {
  name: "Subscription",
  props: ['data'],
  components: {
    Date, Icons
  },
  computed: {
    months() {
      return this.data.payload.userstate['msg-param-cumulative-months']
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
