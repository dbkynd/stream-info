<template>
  <div>
      <Date :date="data.createdAt"/>
      <div class="name">
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
import Date from "@/components/Date";

export default {
  name: "Cheers",
  props: ['data'],
  components: {
    Date,
  },
}
</script>

<style scoped>
</style>
