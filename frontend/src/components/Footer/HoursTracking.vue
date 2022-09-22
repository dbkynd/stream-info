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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

interface Hours {
  thisQuarter: number;
  lastQuarter: number;
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
