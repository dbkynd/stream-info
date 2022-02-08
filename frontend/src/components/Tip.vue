<template>
  <div>
    <Date :date="data.createdAt"/>
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
import Date from "@/components/Date";

export default {
  name: "Tip",
  props: ['data'],
  components: {
    Date,
  },
}
</script>

<style scoped>

</style>
