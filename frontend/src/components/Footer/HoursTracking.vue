<template>
  <div class="hours">
    <div>
      Hours this month: <span v-if="!loading">{{ hours.thisMonth }}</span>
      <span v-else>
        <v-progress-circular size="16" indeterminate width="2" />
      </span>
    </div>
    <div>
      Hours last month: <span v-if="!loading">{{ hours.lastMonth }}</span>
      <span v-else>
        <v-progress-circular size="16" indeterminate width="2" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

interface Hours {
  thisMonth: number;
  lastMonth: number;
}

const loading = ref(true);
const hours = ref({} as Hours);

onMounted(() => {
  loading.value = true;
  api
    .get('/hours')
    .then(({ data }) => {
      hours.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style scoped>
.hours {
  color: #6ee118;
}
</style>
