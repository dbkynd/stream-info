<template>
  <div>
    <div>
      <span class="name">{{ data.payload.userstate['display-name'] }}</span>
      <template v-if="!isYear || !showYears">
        <span class="amount" :class="{glow: doGlow}">&nbsp;{{ months }}</span>
        <span v-if="months !== newSubText">&nbsp;months</span>
      </template>
      <template v-else>
        <span class="amount" :class="{glow: doGlow}">&nbsp;{{ years }}</span>
      </template>
      <span v-if="isYear">
        <img class="cake" :src="require('@/assets/cake.svg')" alt="" :title="years" />
      </span>
    </div>

    <div class="message">
      <SubMessage :payload="data.payload"/>
    </div>
  </div>
</template>

<script>
import SubMessage from '@/components/SubMessage'
import { mapState } from 'vuex'

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
    ...mapState({
      glowNew: state => state.settings.glowNew,
      glowYears: state => state.settings.glowYears,
      showYears: state => state.settings.showYears,
    }),
    months() {
      const months = this.data.payload.userstate['msg-param-cumulative-months']
      if (months === true) return this.newSubText
      return months
    },
    isYear() {
      return this.months % 12 === 0;
    },
    years() {
      const years = this.months / 12;
      if (years === 1) return years + ' year!';
      return years + ' years!';
    },
    doGlow() {
      return (this.glowNew && this.months === this.newSubText) || (this.glowYears && this.isYear);
    },
  },
}
</script>

<style scoped>
.cake {
  height: 20px;
  position: relative;
  top: 3px;
  margin-left: 5px;
}
</style>
