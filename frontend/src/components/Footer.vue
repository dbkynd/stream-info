<template>
  <v-footer fixed padless bottom width="100%" :class="{expanded: expanded}">
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
    </v-row>
  </v-footer>
</template>

<script>
import Hours from '@/components/Hours'

export default {
  name: "Footer",
  components: {
    Hours,
  },
  data() {
    return {
      height: '3rem',
      expanded: false,
    }
  },
  methods: {
    logout() {
      window.location.href = '/api/auth/logout';
    }
  }
}
</script>

<style scoped>
.v-footer {
  height: 2.0rem;
  transition: height 0.15s ease-out;
}
.v-footer.expanded {
  height: 30rem;
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
