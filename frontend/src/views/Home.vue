<template>
  <div id="column_container">
    <div class="column">
      <div>
        <SubEvent
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
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from "@/plugins/axios";
import Cheer from '@/components/Cheer'
import SubEvent from '@/components/SubEvent'
import Host from '@/components/Host'
import Tip from '@/components/Tip'
import Footer from '@/components/Footer'
import IdleJs from 'idle-js';
import * as socket from '@/plugins/socket.io';

const idle = new IdleJs({
  idle: 30000,
  events: ['mousemove', 'keydown', 'mousedown', 'touchstart'],
  onIdle: function () {
    console.log('scrolling')
    const e = document.getElementById('column_container')
    if (!e) return
    for (let i = 0; i < e.children.length; i++) {
      if (e.children[i].classList.contains('column')) {
        e.children[i].scrollTo(0, 0)
      }
    }
  },
  keepTracking: true,
  startAtIdle: true,
})
idle.start()

export default {
  name: 'Home',
  components: {
    Cheer,
    SubEvent,
    Host,
    Tip,
    Footer,
  },
  computed: {
    ...mapGetters(['cheers', 'hosts', 'subscriptions', 'tips'])
  },
  created() {
    api.get('/user').then(() => {
      socket.connect()
    }).catch(() => {
      window.location.href = '/api/auth/login';
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
  margin-bottom: 5px;
  opacity: 0.85;
  padding: 0 8px 0;
  cursor: default;
  position: relative;
}

.column > div > div.uncleared {
  background: #6441a4;
}

.column > div > div:nth-child(1) {
  border-left: 8px solid #f9d71a;
}

.name {
  color: #fff;
}

.amount {
  color: #f9d71a;
  margin-left: 0.3em;
}

.name,
.amount {
  font-size: 1.25rem;
  word-break: keep-all;
}

.message, .host, .date {
  word-break: break-word;
  color: #aeb2b4;
}

.emoticon {
  height: 28px;
  position: relative;
  top: 4px;
  margin: -5px 1px;
}

.cardFooter {
  height: 13px;
}
</style>
