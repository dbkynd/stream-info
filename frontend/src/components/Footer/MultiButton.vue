<template>
  <div class="multi" @click="open">
    Multi
    <v-icon class="icon">mdi-open-in-new</v-icon>
  </div>
</template>

<script setup lang="ts">
import api from '@/plugins/axios';

function open() {
  api.get('/multi').then(({ data }) => {
    window.open(data, '_blank');
  });
}
</script>

<style scoped>
div {
  cursor: pointer;
  background-color: #be53bc;
  padding: 2px 12px;
  border-radius: 5px;
  font-size: 12px;
}

div:active {
  position: relative;
  top: 1px;
}

.icon {
  position: relative;
  bottom: 1px;
}
</style>
