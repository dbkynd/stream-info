<template>
  <div class="unauthorized">
    <div>
      <img src="@/assets/biblethump.png" alt="">
    </div>
    <div>
      You are not authorized to view this page.
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized"
}
</script>

<style scoped>
.unauthorized {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-top: 5rem;
}

img {
  height: 250px;
}
</style>
