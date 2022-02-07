<template>
  <div class="column">
      <Subscription
        v-for="subscription in subscriptions"
        :key="subscription._id"
        :class="{uncleared: !subscription.cleared}"
        :data="subscription"
        @click="clear(subscription)"
      />
  </div>
  <div class="column">
    <Cheer
      v-for="cheer in cheers"
      :key="cheer._id"
      :class="{uncleared: !cheer.cleared}"
      :data="cheer"
      @click="clear(cheer)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from "@/plugins/axios";
import Cheer from '@/components/Cheer'
import Subscription from '@/components/Subscription'

export default {
  name: 'Home',
  components: {
    Cheer,
    Subscription,
  },
  computed: {
    ...mapGetters(['cheers', 'hosts', 'subscriptions', 'tips'])
  },
  created() {
    /*axios.get('http://127.0.0.1:3000/stats').then(({data}) => {
      const validToken = data.validToken
      console.log('Valid Token', validToken)
      if (!validToken) {
        this.$router.push('token')
      }
    })*/
    api.get('/user').then(() => {
      api.get('/lists').then(({data}) => {
        this.$store.commit('setLists', data)
      })
    }).catch(() => {
      window.location.href = 'http://localhost:3000/auth/login'
      return
    })
  },
  methods: {
    clear(item) {
      item.cleared = true
    },
  },
}
</script>

<style>
.column {
  width: 25%;
  float: left;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.column::-webkit-scrollbar {
  display: none;
}

.column > div {
  background: #323436;
  border-left: 8px solid #3d7ba6;
  border-radius: 4px;
  margin-bottom: 8px;
  opacity: 0.85;
  padding: 0 12px 8px;
  cursor: default;
}

.column > div.uncleared {
  background: #6441a4;
}

.column > div:nth-child(1) {
  border-left: 8px solid #f9d71ae8;
}

.name,
.amount {
  color: #f9d71a;
}

.amount {
  font-size: 1.25rem;
  margin-left: 0.5rem;
}
</style>
