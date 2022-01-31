<template>
  <div>
    Hello World
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  created() {
    axios.get('http://127.0.0.1:3000/stats').then(({data}) => {
      const validToken = data.validToken
      console.log('Valid Token', validToken)
      if (!validToken) {
        this.$router.push('token')
      }
    })
  }
}
</script>
