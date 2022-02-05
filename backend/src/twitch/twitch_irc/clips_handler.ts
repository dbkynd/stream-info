import tmi from 'tmi.js';
import ClipChannel from '../../database/lib/clip_channel';
import twitchApi from '../twitch_api';
import * as twitchIrc from '../twitch_irc';

const clipsReg = /clips\.twitch\.tv\/([\w-]+)|twitch.tv\/\w+\/clip\/([\w-]+)/;
const permittedUsers = new Map();

export default async (userstate: tmi.ChatUserstate, message: string) => {
  // Permit users to share clips not in the allowed clips database
  if (message.toLowerCase().startsWith('!permit')) {
    permit(userstate, message).catch();
    return;
  }

  // Exit if user is vip+
  const badges = userstate['badges'];
  if (badges) {
    if (badges.broadcaster) return;
    if (badges.moderator) return;
    if (badges.vip) return;
  }

  // Exit if the user is currently permitted
  if (permittedUsers.has(userstate['user-id'])) return;

  // Exit if the message does not contain a clip
  if (!clipsReg.test(message)) return;

  // Extract the clip stub from the message
  const match = message.match(clipsReg) || [];
  const slug = match[2] || match[1];
  if (!slug) return;

  // Query the Twitch API for the clip data
  const [clipData] = await twitchApi.getClip(slug);
  if (!clipData) return;

  // Exit if the clip id matches the broadcasters id
  const clipChannelId = clipData.broadcaster_id;
  if (!clipChannelId) return;
  if (clipChannelId === userstate['room-id']) return;

  // Exit if the clips channel id is allowed
  if (await ClipChannel.has(clipChannelId)) return;

  // Delete the message containing the clip we don't allow
  if (userstate.id) twitchIrc.deleteMessage(userstate.id);
};

async function permit(userstate: tmi.ChatUserstate, message: string) {
  // Get the username of the user we want to permit
  const user = message
    .toLowerCase()
    .replace('!permit', '')
    .trim()
    .split(' ')[0];
  if (!user) return;

  // Query the Twitch API for user data
  const [userData] = await twitchApi.getUsers([user]);
  if (!userData) return;
  const id = userData.id;

  // Clear the permit if already existing
  if (permittedUsers.has(id)) {
    clearTimeout(permittedUsers.get(id));
    permittedUsers.delete(id);
  }

  // Create the permit that expires after a time
  permittedUsers.set(
    id,
    setTimeout(() => {
      if (permittedUsers.has(id)) {
        permittedUsers.delete(id);
      }
    }, 1000 * 60),
  );
}
