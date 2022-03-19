<template>
  <v-footer fixed padless bottom width="100%" :class="{expanded: expanded}" @mouseleave="mouseleave" @mouseenter="mouseenter">
    <v-row v-if="!expanded">
      <v-col cols="4">
        <Status />
      </v-col>
      <v-col cols-="4">
        <v-row justify="center">
          <div class="chevron" @click="expanded = !expanded">
            <v-icon v-if="expanded">mdi-chevron-double-down</v-icon>
            <v-icon v-else>mdi-chevron-double-up</v-icon>
          </div>
        </v-row>
      </v-col>
      <v-col cols="4">

      </v-col>
    </v-row>

<!--    <div v-if="!expanded">
    </div>
    <div v-else>
      <v-row>
        <v-col cols="5" class="left">
          LEFT
        </v-col>
        <v-col cols="2" class="middle">

        </v-col>
        <v-col cols="5" class="right">
          RIGHT
        </v-col>
      </v-row>
      <v-row>
        <Hours />
        <v-btn color="blue" @click="clearAll">Clear All</v-btn>
      </v-row>
    </div>-->
  </v-footer>
</template>

<script>
// import Hours from '@/components/Hours'
import { api } from '@/plugins/axios'
import Status from '@/components/Status';

export default {
  name: "Footer",
  components: {
    // Hours,
    Status,
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
  padding-left: 0;
  padding-right: 0;
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

.chevron {
  cursor: pointer;
  position: absolute;
  top: 0;
}
</style>
