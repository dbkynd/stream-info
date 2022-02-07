<template>
<div class="icons">
  <div v-if="subPlan">
    <div v-if="subPlan === 'Prime'">
      <img src="@/assets/prime.png" alt="">
    </div>
    <div v-else-if="subPlan === '2000'">
      <img src="@/assets/silver_star.png" alt="">
    </div>
    <div v-else-if="subPlan === '3000'">
      <img src="@/assets/gold_star.png" alt="">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Icons",
  props: ['userstate'],
  computed: {
    subPlan() {
      return this.userstate['msg-param-sub-plan']
    }
  }
}
</script>

<style scoped>
.icons {
  height: 1.0rem;
}
.icons img {
  height: 20px;
}
</style>
