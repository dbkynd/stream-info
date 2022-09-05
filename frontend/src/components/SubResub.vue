<template>
  <div>
    <div>
      <div v-if="prepaid" class="subtext teal">
        Prepaid for {{ prepaid }} months!
      </div>
      <span class="name">{{ username }}</span>
      <template v-if="!isYear || !showYears">
        <span class="amount" :class="{ glow }">&nbsp;{{ months }}</span>
        <span v-if="months !== newSubText">&nbsp;months</span>
      </template>
      <template v-else>
        <span class="amount" :class="{ glow }">&nbsp;{{ years }}</span>
      </template>
      <span v-if="isYear">
        <img
          class="cake"
          :src="require('@/assets/cake.svg')"
          alt=""
          :title="cakeTitle"
        />
      </span>
    </div>
    <div class="message">
      <SubMessage :payload="data.payload" />
    </div>
  </div>
</template>

<script>
import SubMessage from '@/components/SubMessage';
import subComp from '@/plugins/sub_computed';

export default {
  name: 'SubResub',
  props: ['data'],
  components: {
    SubMessage,
  },
  computed: {
    ...subComp,
    prepaid() {
      const duration =
        this.data.payload.userstate['msg-param-multimonth-duration'];
      const tenure = this.data.payload.userstate['msg-param-multimonth-tenure'];
      if (duration === true) return;
      if (duration && tenure === false) {
        return duration;
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.cake {
  height: 20px;
  position: relative;
  top: 3px;
  margin-left: 5px;
}
</style>
