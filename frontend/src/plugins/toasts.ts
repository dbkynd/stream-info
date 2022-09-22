import { useToast } from 'vue-toastification';
import BooleanToast from '@/components/Toast/BooleanToast.vue';
import FollowersOnlyToast from '@/components/Toast/FollowersOnlyToast.vue';
import SlowModeToast from '@/components/Toast/SlowModeToast.vue';
import { store } from '@/store';

const toast = useToast();

export function roomstate(key: string, value: boolean | string) {
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

export function appState(key: string, value: boolean) {
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

export function error(message: string): void {
  toast.error(message, { timeout: 2000 });
}

export function success(message: string) {
  toast.success(message, { timeout: 2000 });
}

export function info(message: string) {
  toast.info(message, { timeout: 2000 });
}

export function warn(message: string) {
  toast.warning(message, { timeout: 2000 });
}
