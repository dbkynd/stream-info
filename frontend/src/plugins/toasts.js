import SlowModeToast from '@/components/Toasts/SlowMode';
import FollowersOnlyToast from '@/components/Toasts/FollowersOnly';
import BooleanToast from '@/components/Toasts/Boolean';
import { useToast } from 'vue-toastification';

const toast = useToast();

export function roomstate(key, value) {
  if (key === 'slow') {
    toast({
      component: SlowModeToast,
      props: { value },
    });
  }

  if (key === 'followers-only') {
    toast({
      component: FollowersOnlyToast,
      props: { value },
    });
  }

  if (key === 'subs-only') {
    toast({
      component: BooleanToast,
      props: { name: 'Sub Only', value },
    });
  }

  if (key === 'emote-only') {
    toast({
      component: BooleanToast,
      props: { name: 'Emote Only', value },
    });
  }

  if (key === 'r9k') {
    toast({
      component: BooleanToast,
      props: { name: 'Unique Chat', value },
    });
  }
}

export function appState(key, value) {
  if (key === 'raidmode') {
    toast({
      component: BooleanToast,
      props: { name: 'Raid', value },
    });
  }
}
