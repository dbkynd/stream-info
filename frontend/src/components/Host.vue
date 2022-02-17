<template>
  <div>
    <Timestamp :date="data.createdAt"/>
    <div>
      <span class="name">{{ name }}</span> {{ data.payload.raid ? 'raided' : 'hosted' }} with<span class="amount">{{ data.payload.viewers }}</span> viewers
    </div>
    <div class="game">
      {{ data.payload.game }}
    </div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";

export default {
  name: "Host",
  props: ['data'],
  components: {
    Timestamp,
  },
  computed: {
    name() {
      return this.data.payload.displayName ||   this.data.payload.username
    },
  },
}
</script>

<style scoped>
.game {
  font-size: 0.8rem;
}
</style>
