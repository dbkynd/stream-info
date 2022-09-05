<template>
  <div class="notfound">
    <h1>404 Not Found</h1>
    <div>
      <v-img src="@/assets/modCheck.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.notfound {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-top: 5rem;
}

.v-img {
  margin-top: 1em;
  height: 250px;
}
</style>
