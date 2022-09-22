<template>
  <v-row justify="space-around" no-gutters>
    <v-btn
      color="pink-darken-2"
      append-icon="mdi-open-in-new"
      @click="router.push({ name: 'SusTerms' })"
    >
      Sus Follower Terms
    </v-btn>
    <v-btn
      color="blue-darken-2"
      append-icon="mdi-notification-clear-all"
      @click="clearAll"
    >
      Clear All
    </v-btn>
    <v-btn
      color="purple"
      append-icon="mdi-cog"
      @click="router.push({ name: 'Settings' })"
    >
      Settings
    </v-btn>
    <v-btn color="red-darken-2" append-icon="mdi-logout" @click="logout">
      Logout
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import router from '@/router';
import { useStore } from '@/store';

const store = useStore();

function logout() {
  window.location.href = '/api/auth/logout';
}

function clearAll() {
  store.dispatch('clearAll');
}
</script>
