<template>
  <div class="notfound">
    <h1>404</h1>
    <div>
      <v-img src="@/assets/notlikethis.png" alt="" />
    </div>
    <div>
      There is nothing here.
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.notfound {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-top: 5rem;
}

.v-img {
  height: 250px;
}
</style>
