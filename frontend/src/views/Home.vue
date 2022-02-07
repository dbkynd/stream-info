<template>
  <div class="column">
    <Subscriptions />
  </div>
  <div class="column">
    <Cheers />
  </div>

  <div class="column">

  </div>

  <div class="column">

  </div>
</template>

<script>
import { api } from "@/plugins/axios";
import Cheers from '@/components/Cheers'
import Subscriptions from '@/components/Subscriptions'

export default {
  name: 'Home',
  components: {
    Cheers,
    Subscriptions,
  },
  created() {
    /*axios.get('http://127.0.0.1:3000/stats').then(({data}) => {
      const validToken = data.validToken
      console.log('Valid Token', validToken)
      if (!validToken) {
        this.$router.push('token')
      }
    })*/
    api.get('/user').then(({data}) => {
      console.log('user data', data)
      api.get('/state').then(({data}) => {
        this.$store.dispatch('setState', data)
      })
      api.get('/lists').then(({data}) => {
        this.$store.commit('setLists', data)
      })
    }).catch(() => {
      window.location.href = 'http://localhost:3000/auth/login'
      return
    })
  }
}
</script>

<style>
.column {
  width: 25%;
  float: left;
  height: 100%;
}

.column > div {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.column > div > div {
  background: #323436;
  border-left: 8px solid #3d7ba6;
  border-radius: 4px;
  margin-bottom: 8px;
  opacity: 0.85;
  padding: 0 12px 8px;
  cursor: default;
}

.column > div > div:nth-child(1) {
  border-left: 8px solid #f9d71ae8;
}

.name {
  color: #f9d71a;
}

.uncleared {
  background: #6441a4;
}
</style>
