<template>
  <div>
    <Timestamp :date="data.createdAt"/>
    <div>
      <span class="name">
        {{ data.payload.username }}
      </span>
      <span class="amount">
        ${{ data.payload.amount }}
      </span>
    </div>
    <Message :payload="data.payload" />
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";

import Message from '@/components/Message';

export default {
  name: "Tip",
  props: ['data'],
  components: {
    Timestamp, Message,
  }
}
</script>

<style scoped>

</style>
