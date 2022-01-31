<template>
<div>Invalid Token</div>
  <button @click="getToken">Get New Token</button>
</template>

<script>
import axios from 'axios'

export default {
  name: "InvalidToken",
  mounted() {
    const fragment = new URLSearchParams(document.location.search)
    let state = fragment.get('state')
    if (!state) return

    if (
        localStorage.getItem('oauth-state') !==
        atob(decodeURIComponent(state))
    ) {
      this.error = true
      return
    }

    const [code] = [
      fragment.get('code'),
    ]
    console.log(code)
    if (!code) {
      this.error = true
      return
    }

    axios.post('http://127.0.0.1:3000/setToken', { code }).finally(() => {
      this.$router.push('/')
    })
  },
  methods: {
    generateRandomString() {
      let randomString = ''
      const randomNumber = Math.floor(Math.random() * 10)

      for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(
            33 + Math.floor(Math.random() * 94)
        )
      }

      return randomString
    },

    async getToken() {
      const state = {
        slug: this.generateRandomString(),
      }
      localStorage.setItem('oauth-state', JSON.stringify(state))
      const scopes = await axios.get('http://127.0.0.1:3000/stats').then(({data}) => {
        return data.requiredScopes
      })
      const callbackUrl =
          'http://localhost:8080/token'
      window.location = `https://id.twitch.tv/oauth2/authorize?client_id=t79tq8gm1fq9aj2vxg9rcqfttxe1svv&redirect_uri=${encodeURIComponent(
          callbackUrl
      )}&response_type=code&force_verify=true&scope=${encodeURIComponent(scopes.join(' '))}&state=${encodeURIComponent(
          btoa(JSON.stringify(state))
      )}`
    }
  }
}
</script>

<style scoped>

</style>
