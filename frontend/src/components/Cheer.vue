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
      <div class="message">
        {{ data.payload.message }}
      </div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";

export default {
  name: "Cheer",
  props: ['data'],
  components: {
    Timestamp,
  },
}
</script>

<style scoped>
</style>
