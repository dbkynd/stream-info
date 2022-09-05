<template>
  <div class="container">
    <span v-if="value === false">
      {{ name }} mode has been <span class="bold">DISABLED</span>.
    </span>
    <span v-else>
      {{ name }} mode has been <span class="bold">ENABLED</span>.
    </span>
  </div>
</template>

<script>
export default {
  name: 'BooleanToast',
  props: ['name', 'value'],
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
