<template>
  <div id="container">
    <div class="column">
      <div>
        <Subscription
          v-for="subscription in subscriptions"
          :key="subscription._id"
          :class="{uncleared: !subscription.cleared}"
          :data="subscription"
          @click="clear('subscriptions', subscription)"
        />
      </div>
    </div>
    <div class="column">
      <div>
        <Cheer
          v-for="cheer in cheers"
          :key="cheer._id"
          :class="{uncleared: !cheer.cleared}"
          :data="cheer"
          @click="clear('cheers', cheer)"
        />
      </div>
    </div>
    <div class="column">
      <div>
        <Tip
          v-for="tip in tips"
          :key="tip._id"
          :class="{uncleared: !tip.cleared}"
          :data="tip"
          @click="clear('tips', tip)"
        />
      </div>
    </div>
    <div class="column">
      <div>
        <Host
          v-for="host in hosts"
          :key="host._id"
          :class="{uncleared: !host.cleared}"
          :data="host"
          @click="clear('hosts', host)"
        />
      </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from "@/plugins/axios";
import Cheer from '@/components/Cheer'
import Subscription from '@/components/Subscription'
import Host from '@/components/Host'
import Tip from '@/components/Tip'
// import Status from '@/components/Status'
import IdleJs from 'idle-js';

const idle = new IdleJs({
  idle: 30000, // idle time in ms
  events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
  onIdle: function () {
    console.log('scrolling')
    const e = document.getElementById('container')
    if (!e) return
    for (let i = 0; i < e.children.length; i++) {
      e.children[i].scrollTo(0, 0)
    }
  }, // callback function to be executed after idle time
  onActive: function () {}, // callback function to be executed after back form idleness
  onHide: function () {}, // callback function to be executed when window become hidden
  onShow: function () {}, // callback function to be executed when window become visible
  keepTracking: true, // set it to false if you want to be notified only on the first idleness change
  startAtIdle: false, // set it to true if you want to start in the idle state
})
idle.start()

export default {
  name: 'Home',
  components: {
    Cheer,
    Subscription,
    Host,
    Tip,
    // Status,
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
    clear(name, item) {
      item.cleared = true
      api.post('/clear', { name, id: item._id }).catch()
    },
  },
}
</script>

<style>
.column {
  width: 25%;
  float: left;
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;
}

.column::-webkit-scrollbar {
  display: none;
}

.column > div {
  margin: 0.5em 0.5em 0 0.5em ;
}

.column > div > div {
  background: #323436;
  border-left: 8px solid #3d7ba6;
  border-radius: 4px;
  margin-bottom: 8px;
  opacity: 0.85;
  padding: 0 12px 8px;
  cursor: default;
  position: relative;
}

.column > div > div.uncleared {
  background: #6441a4;
}

.column > div > div:nth-child(1) {
  border-left: 8px solid #f9d71a;
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
