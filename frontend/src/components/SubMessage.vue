<template>
  <Message :payload="payload" />
</template>

<script>
import Message from '@/components/Message';

export default {
  name: 'TwitchMessage',
  props: ['payload'],
  components: { Message },
};
</script>

<style scoped></style>
