<template>
  <div>
    <div v-for="cheer in cheers" :key="cheer._id" class="cheer" :class="{ uncleared: !cheer.cleared }" @click="clear(cheer)">
      <Date :date="cheer.createdAt"/>
      <div class="name">
        {{ cheer.payload.userstate['display-name'] }}
      </div>
      <div class="message">
        {{ cheer.payload.message }}
      </div>
    </div>
  </div>
</template>

<script>
import Date from "@/components/Date";

export default {
  name: "Cheers",
  components: {
    Date,
  },
  computed: {
    cheers() {
      return this.$store.getters.cheers
    }
  },
  methods: {
    clear(subscription) {
      subscription.cleared = true
    }
  }
}
</script>

<style scoped>
.cheer {
  background: #323436;
  border-left: 8px solid #3d7ba6;
  border-radius: 4px;
  margin-bottom: 8px;
  opacity: 0.85;
  padding: 0 12px 8px;
  cursor: default;
}

.cheer:nth-child(1) {
  border-left: 8px solid #f9d71ae8;
}

.name {
  color: #f9d71a;
}

.uncleared {
  background: #6441a4;
}
</style>
