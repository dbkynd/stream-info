import SlowModeToast from '@/components/Toasts/SlowMode';
import FollowersOnlyToast from '@/components/Toasts/FollowersOnly';
import BooleanToast from '@/components/Toasts/Boolean';
import { useToast } from 'vue-toastification';
import store from '../store';

const toast = useToast();

export function roomstate(key, value) {
  const showToast =
    store.state.settings.showRoomstateToasts === undefined
      ? true
      : store.state.settings.showRoomstateToasts;
  if (!showToast) return;
  const timeout =
    store.state.settings.toastDuration === undefined
      ? 5000
      : store.state.settings.toastDuration;

  if (key === 'slow') {
    toast(
      {
        component: SlowModeToast,
        props: { value },
      },
      { timeout },
    );
  }

  if (key === 'followers-only') {
    toast(
      {
        component: FollowersOnlyToast,
        props: { value },
      },
      { timeout },
    );
  }

  if (key === 'subs-only') {
    toast(
      {
        component: BooleanToast,
        props: { name: 'Sub Only', value },
      },
      { timeout },
    );
  }

  if (key === 'emote-only') {
    toast(
      {
        component: BooleanToast,
        props: { name: 'Emote Only', value },
      },
      { timeout },
    );
  }

  if (key === 'r9k') {
    toast(
      {
        component: BooleanToast,
        props: { name: 'Unique Chat', value },
      },
      { timeout },
    );
  }
}

export function appState(key, value) {
  const timeout =
    store.state.settings.toastDuration === undefined
      ? 5000
      : store.state.settings.toastDuration;

  if (key === 'raidmode') {
    const showToast =
      store.state.settings.showRaidmodeToasts === undefined
        ? true
        : store.state.settings.showRaidmodeToasts;
    if (!showToast) return;

    toast(
      {
        component: BooleanToast,
        props: { name: 'Raid', value },
      },
      { timeout },
    );
  }
}
