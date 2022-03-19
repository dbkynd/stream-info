<template>
  <div>
      <Timestamp :date="data.createdAt"/>
      <div>
        <span class="name">
          {{ data.payload.userstate['display-name'] }}
        </span>
        <span class="amount">
          {{ data.payload.userstate['bits']}}
        </span>
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
}
</script>

<style scoped>
</style>
