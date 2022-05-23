import seApi from './se_api';

async function say(message: string) {
  await seApi.postChannelSay(message);
}

async function announce(message: string) {
  await seApi.postChannelSay(`/announce ${message}`);
}

async function followersOff() {
  await seApi.postChannelSay('/followersoff');
}

async function followers(minutes?: number) {
  if (!minutes) await seApi.postChannelSay('/followers');
  else await seApi.postChannelSay(`/followers ${minutes}`);
}

export default {
  say,
  announce,
  followersOff,
  followers,
};
