<template>
<div class="card" >
  <Date :date="data.createdAt"/>
  <div class="name">
    {{ data.payload.userstate['display-name'] }}
  </div>
  <div class="message">
    {{ data.payload.message }}
  </div>
  <Icons :userstate="data.payload.userstate"/>
</div>
</template>

<script>
import Date from '@/components/Date'
import Icons from '@/components/Icons'

export default {
  name: "NotificationCard",
  props: ['name', 'data'],
  components: {
    Date, Icons
  }
}
</script>

<style scoped>



</style>
