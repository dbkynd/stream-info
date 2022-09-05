<template>
  <div class="container">
    <span v-if="value === '-1'">
      Followers Only mode has been <span class="bold">DISABLED</span>.
    </span>
    <span v-else-if="value === '0'">
      Followers Only mode has been <span class="bold">ENABLED</span>.
    </span>
    <span v-else>
      Followers Only mode has been <span class="bold">ENABLED</span> with a
      <span class="bold">{{ amount }}</span> {{ unit }} duration.
    </span>
  </div>
</template>

<script>
export default {
  name: 'FollowersOnlyToast',
  props: ['value'],
  computed: {
    amount() {
      const num = parseInt(this.value || '0');
      if (num % 10080 === 0) return num / 10080;
      if (num % 1440 === 0) return num / 1440;
      if (num % 60 === 0) return num / 60;
      return num;
    },
    unit() {
      const num = parseInt(this.value || '0');
      if (num % 10080 === 0) return 'week';
      if (num % 1440 === 0) return 'day';
      if (num % 60 === 0) return 'hour';
      return 'minute';
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
