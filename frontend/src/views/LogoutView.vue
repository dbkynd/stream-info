<template>
  <div class="alt-view-container">
    <h1>You have successfully logged out.</h1>
    <v-img class="mt-1" :src="peepoLeave" alt="peepoLeave" height="250" />
    <v-btn color="purple" @click="login">Login</v-btn>
  </div>
</template>

<script setup lang="ts">
import peepoLeave from '@/assets/images/peepoLeave.gif';

function login() {
  window.location.href = '/api/auth/login';
}
</script>
