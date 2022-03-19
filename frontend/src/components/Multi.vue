<template>
      <div class="multi" @click="openMulti">
        Multi
        <v-icon class="icon">mdi-open-in-new</v-icon>
      </div>
</template>

<script>
import { api } from '@/plugins/axios'

export default {
  name: "Multi",
  methods: {
    openMulti() {
      api.get('/multi').then(({data}) => {
        window.open(data, '_blank')
      })
    }
  }
}
</script>

<style scoped>
.multi {
  cursor: pointer;
  background-color: #be53bc;
  margin-right: 8px;
  padding: 2px 12px;
  border-radius: 5px;
  font-size: 12px;
}

.multi:active {
  position: relative;
  top: 1px;
}

.icon {
  position: relative;
  bottom: 1px;
}
</style>
