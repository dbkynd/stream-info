import axios from 'axios';
import { getChannelId } from '../token';

let emoticons: MyEmotes = {};

async function fetch(): Promise<void> {
  const channelId = getChannelId();
  const roomInfo = await axios
    .get(`https://api.frankerfacez.com/v1/room/id/${channelId}`)
    .then(({ data }: { data: FFZRoomInfo }) => data);
  const emotes: MyEmotes = {};
  for (const key in roomInfo.sets) {
    const set = roomInfo.sets[key];
    set.emoticons.forEach((emoticon) => {
      if (!emotes[emoticon.name]) {
        emotes[emoticon.name] = {
          static: `https:${emoticon.urls['1']}`,
          source: 'ffz',
        };
      }
    });
  }
  emoticons = emotes;
}

function get(): MyEmotes {
  return emoticons;
}

export default {
  fetch,
  get,
};
