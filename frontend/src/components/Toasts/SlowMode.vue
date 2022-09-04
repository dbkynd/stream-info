<template>
  <div class="container">
    <span v-if="value === false">Slow Mode has been <span class="bold">DISABLED</span>.</span>
    <span v-else>Slow Mode has been <span class="bold">ENABLED</span> with a <span class="bold">{{ amount }}</span> {{ unit }} duration.</span>
  </div>
</template>

<script>
export default {
  name: "SlowModeToast",
  props: ["value"],
  computed: {
    amount() {
      const num = parseInt(this.value)
      if (num % 60 === 0) return num / 60
      return num
    },
    unit() {
      const num = parseInt(this.value)
      if (num % 60 === 0) return "minute"
      return "second"
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
