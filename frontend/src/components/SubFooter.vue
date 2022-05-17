<template>
  <div class="container">
    <div class="icons">
      <div v-if="subPlan">
        <div v-if="subPlan === 'Prime'">
          <img :src="require('@/assets/prime.png')" alt="Prime" />
        </div>
        <div v-else-if="subPlan === '2000'">
          <img :src="require('@/assets/silver_star.png')" alt="Tier2" />
        </div>
        <div v-else-if="subPlan === '3000'">
          <img :src="require('@/assets/gold_star.png')" alt="Tier3" />
        </div>
      </div>
      <div v-if="userstate['msg-id'].includes('gift')">
        <img :src="require('@/assets/gift-icon.png')" alt="Gift" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubFooter",
  props: ['userstate'],
  computed: {
    subPlan() {
      return this.userstate['msg-param-sub-plan']
    }
  }
}
</script>

<style scoped>
.container {
  height: 15px;
}

.icons {
  position: absolute;
  bottom: -2px;
  right: 5px;
}

.icons img {
  height: 14px;
}
</style>
