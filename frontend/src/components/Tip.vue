<template>
  <div>
    <Timestamp :date="data.createdAt" />

    <div>
      <span class="name">{{ data.payload.username }}</span>
      <span class="amount">&nbsp;${{ amount }}</span>
    </div>

    <Message :payload="data.payload" :decode="true" />

    <div class="cardFooter"></div>
  </div>
</template>

<script>
import Timestamp from '@/components/Timestamp';

import Message from '@/components/Message';

export default {
  name: 'Tip',
  props: ['data'],
  components: {
    Timestamp,
    Message,
  },
  computed: {
    amount() {
      const value = this.data.payload.amount;
      if (value % 1 !== 0) {
        return value.toFixed(2);
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped></style>
