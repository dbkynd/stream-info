<template>
  <div>
      <Timestamp :date="data.createdAt"/>

      <div>
        <span class="name">{{ username }}</span>
        <span class="amount">&nbsp;{{ data.payload.userstate['bits']}}</span>
        <span class="dollars" v-if="showCheerAmounts">&nbsp;${{ dollars }}</span>
      </div>

    <Message :payload="data.payload" />

    <div class="cardFooter"></div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";
import Message from '@/components/Message';
import { displayName } from '@/plugins/utils'

export default {
  name: "Cheer",
  props: ['data'],
  components: {
    Timestamp,
    Message,
  },
  computed: {
    username() {
      return displayName(this.data.payload.userstate['username'], this.data.payload.userstate['display-name'])
    },
    showCheerAmounts() {
      return this.$store.state.settings.cheerAmounts;
    },
    dollars() {
      const value = parseInt(this.data.payload.userstate['bits']) / 100;
      if (value % 1 !== 0) {
        return value.toFixed(2);
      } else {
        return value;
      }
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
  margin-left: 3px;
}
</style>
