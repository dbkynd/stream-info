<template>
  <div>
      <Timestamp :date="data.createdAt"/>

      <div>
        <span class="name">{{ data.payload.userstate['display-name'] }}</span>
        <span class="amount">&nbsp;{{ data.payload.userstate['bits']}}</span>
        <span class="dollars" v-if="cheerAmounts">&nbsp;{{dollarValue}}</span>
      </div>

    <Message :payload="data.payload" />

    <div class="cardFooter"></div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";
import Message from '@/components/Message';

export default {
  name: "Cheer",
  props: ['data'],
  components: {
    Timestamp,
    Message,
  },
  computed: {
    cheerAmounts() {
      return this.$store.state.settings.cheerAmounts;
    },
    dollarValue() {
      const bits = parseInt(this.data.payload.userstate['bits']);
      const dollars = Math.round((bits + Number.EPSILON) * 100) / 10000

      return `($${dollars})`;
    }
  }
}
</script>

<style scoped>
.dollars {
  color: gray;
  font-size: 0.8em;
  position: relative;
  bottom: 3px;
  margin-left: 2px;
}
</style>
