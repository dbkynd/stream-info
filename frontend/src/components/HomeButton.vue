<template>
  <v-btn color="primary" class="mr-2" @click="router.push({ name: 'Home' })">
    <v-icon icon="mdi-home" size="x-large"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import router from '@/router';
</script>
