<template>
    <div class="date" :title="this.date">
      {{ dateFormatted }}
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: "Date",
  props: [ 'date' ],
  computed: {
    ...mapState('now', ['now']),
    dateFormatted() {
      const diff = this.now - new Date(this.date).valueOf()
      const minutes = Math.floor(diff / 1000 / 60)
      if (minutes <= 0) return 'Less than a minute ago'
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
.date {
  font-size: 0.7rem;
  width: 100%;
  text-align: right;
  position: relative;
  left: 3px;
  height: 10px;
}
</style>
