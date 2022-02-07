<template>
  <div>
    <div v-for="subscription in subscriptions" :key="subscription._id" :class="{uncleared: !subscription.cleared}">
      <NotificationCard :type="name" :data="subscription" />
    </div>
  </div>
</template>

<script>
import NotificationCard from '@/components/NotificationCard'

export default {
  name: "Subscriptions",
  components: {
    NotificationCard,
  },
  computed: {
    subscriptions() {
      return this.$store.getters.subscriptions
    }
  },
  methods: {
    clear(subscription) {
      subscription.cleared = true
    }
  }
}
</script>

<style scoped>



</style>
