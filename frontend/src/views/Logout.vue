<template>
  <div class="notfound">
    <h1>You have successfully logged out.</h1>
    <div>
      <v-img src="@/assets/peepoLeave.gif" alt="" />
    </div>
    <div>
      <v-btn color="purple" @click="login">Login</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    login() {
      window.location.href = '/api/auth/login';
    },
  }
}
</script>

<style scoped>
.notfound {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-top: 5rem;
}

.v-img {
  margin-top: 1em;
  height: 250px;
}
</style>
