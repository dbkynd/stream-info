<template>
  <v-row>
    <v-col cols="12">
      <v-card class="card elevation-1">
        <slot />
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.card {
  background: #323236;
  border: 1px solid #2c2c2f;
  border-radius: 5px;
  padding: 10px;
  position: relative;
}
</style>
