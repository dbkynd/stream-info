<template>
  <v-footer fixed padless bottom width="100%" :class="{expanded: expanded}" @mouseleave="mouseleave" @mouseenter="mouseenter">
    <v-row>
      <v-col cols="5" class="left">
        LEFT
      </v-col>
      <v-col cols="2" class="middle">
        <v-btn @click="expanded = !expanded">
          <v-icon v-if="expanded">mdi-chevron-double-down</v-icon>
          <v-icon v-else>mdi-chevron-double-up</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="5" class="right">
        RIGHT
      </v-col>
    </v-row>
    <v-row v-show="expanded">
      <Hours />
      <v-btn color="blue" @click="clearAll">Clear All</v-btn>
    </v-row>
  </v-footer>
</template>

<script>
import Hours from '@/components/Hours'
import { api } from '@/plugins/axios'

export default {
  name: "Footer",
  components: {
    Hours,
  },
  data() {
    return {
      height: '3rem',
      expanded: false,
      closeTimer: null,
    }
  },
  methods: {
    logout() {
      window.location.href = '/api/auth/logout';
    },
    clearAll() {
      this.$store.commit('clearAll');
      api.post('/clear/all').catch();
    },
    mouseleave() {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, 500)
    },
    close() {
      this.expanded = false
    },
    mouseenter() {
      if (this.closeTimer) clearTimeout(this.closeTimer);
    }
  }
}
</script>

<style scoped>
.v-footer {
  height: 2.0rem;
  transition: height 0.15s ease-out;
  background: #232426;
  opacity: 0.95;
}
.v-footer.expanded {
  height: 25rem;
  transition: height 0.25s ease-in;
}
.left {
  text-align: left;
}
.middle {
  text-align: center;
}
.right {
  text-align: right;
}

</style>
