<template>
  <div>
    <Date :date="data.createdAt"/>
    <div>
      <span class="name">
        {{ name }}
      </span>
      <span class="amount">
        {{ data.payload.viewers }}
      </span>
    </div>
    <div class="message">
      {{ data.payload.game }}
    </div>
  </div>
</template>

<script>
import Date from "@/components/Date";

export default {
  name: "Host",
  props: ['data'],
  components: {
    Date,
  },
  computed: {
    name() {
      return this.data.payload.displayName ||   this.data.payload.username
    },
  },
}
</script>

<style scoped>

</style>
