import { mapState } from 'vuex';

export default {
  ...mapState({
    glowNew: (state) => state.settings.glowNew,
    glowYears: (state) => state.settings.glowYears,
    showYears: (state) => state.settings.showYears,
    showMassGiftRecipients: (state) => state.settings.showMassGiftRecipients,
  }),
  newSubText() {
    return 'NEW';
  },
  username() {
    const login = this.data.payload.userstate['login'];
    const displayName = this.data.payload.userstate['display-name'];
    if (!displayName) return login;
    if (login.toLowerCase() !== displayName.toLowerCase()) return login;
    return displayName;
  },
  subscriptionMonths() {
    const months = this.data.payload.userstate['msg-param-cumulative-months'];
    if (months === true) return this.newSubText;
    return months;
  },
  giftMonths() {
    const months =
      this.userstate['msg-param-months'] ||
      this.userstate['msg-param-mass-gift-count'];
    if (months === true) return this.newSubText;
    return months;
  },
  months() {
    return this.subscriptionMonths || this.giftMonths;
  },
  isYear() {
    return this.months % 12 === 0;
  },
  years() {
    if (!this.isYear) return null;
    const years = this.months / 12;
    if (years === 1) return years + ' year!';
    return years + ' years!';
  },
  cakeTitle() {
    if (this.showYears) return this.months + ' months';
    return this.years.substring(0, this.years.length - 1);
  },
  glow() {
    return (
      (this.glowNew && this.months === this.newSubText) ||
      (this.glowYears && this.isYear)
    );
  },
  showRecipients() {
    return (
      this.userstate['msg-param-mass-gift-count'] && this.showMassGiftRecipients
    );
  },
};
