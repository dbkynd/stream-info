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
    <div class="message">
      {{ data.payload.message }}
    </div>
  </div>
</template>

<script>
import Timestamp from "@/components/Timestamp";

export default {
  name: "Tip",
  props: ['data'],
  components: {
    Timestamp,
  },
}
</script>

<style scoped>

</style>
