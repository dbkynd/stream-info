<template>
  <div class="date">
    {{ dateFormatted }}
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "Date",
  props: [ 'date' ],
  computed: {
    now() {
      return this.$store.state.now
    },
    dateFormatted() {
      const diff = this.now - new Date(this.date).valueOf()
      const minutes = Math.floor(diff / 1000 / 60)
      if (minutes === 0) return 'Less than a minute ago'
      if (minutes === 1) return '1 minute ago'
      if (minutes < 60) return `${minutes} minutes ago`
      const hours = Math.floor(minutes / 60)
      if (hours === 1) return '1 hour ago'
      if (hours < 24) return `${hours} hours ago`;
      return dayjs(this.date).format('h:mma M/D/YY')
    }
  }
}
</script>

<style scoped>
  .date{
    font-size: 0.8rem;
    height: 1.0rem;
  }
</style>
