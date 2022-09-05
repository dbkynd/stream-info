<template>
  <div v-if="!hide">
    <Timestamp :date="data.createdAt" />

    <SubGift v-if="isGift" :data="data" />
    <PaidUpgrade v-else-if="isUpgrade" :data="data" />
    <SubResub v-else :data="data" />

    <div class="cardFooter">
      <SubFooter :userstate="data.payload.userstate" />
    </div>
  </div>
</template>

<script>
import Timestamp from '@/components/Timestamp';
import SubFooter from '@/components/SubFooter';
import SubResub from '@/components/SubResub';
import SubGift from '@/components/SubGift';
import PaidUpgrade from '@/components/PaidUpgrade';

export default {
  name: 'Subscription',
  props: ['data'],
  components: {
    Timestamp,
    SubFooter,
    SubResub,
    SubGift,
    PaidUpgrade,
  },
  computed: {
    showPaidUpgrades() {
      return this.$store.state.settings.showPaidUpgrades;
    },
    isGift() {
      const giftMsgIds = ['subgift', 'submysterygift'];
      return giftMsgIds.includes(this.data.payload.userstate['msg-id']);
    },
    isUpgrade() {
      const upgradeMsgIds = [
        'primepaidupgrade',
        'giftpaidupgrade',
        'anongiftpaidupgrade',
      ];
      return upgradeMsgIds.includes(this.data.payload.userstate['msg-id']);
    },
    hide() {
      return this.isUpgrade && !this.showPaidUpgrades;
    },
  },
};
</script>
