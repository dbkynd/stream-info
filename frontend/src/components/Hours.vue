<template>
  <div class="hours">
    <div>
      Hours this quarter: <span v-if="!loading">{{ hours.thisQuarter }}</span>
      <span v-else>
        <v-progress-circular size="16" indeterminate width="2" />
      </span>
    </div>
    <div>
      Hours last quarter: <span v-if="!loading">{{ hours.lastQuarter }}</span>
      <span v-else>
        <v-progress-circular size="16" indeterminate width="2" />
      </span>
    </div>
  </div>
</template>

<script>
import { api } from '@/plugins/axios';

export default {
  name: 'Hours',
  data() {
    return {
      loading: false,
      hours: {},
    };
  },
  mounted() {
    this.loading = true;
    api
      .get('/hours')
      .then(({ data }) => {
        this.hours = data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.hours {
  color: #6ee118;
}
</style>
