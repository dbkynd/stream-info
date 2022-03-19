import axios from 'axios';

let emoticons: MyEmotes = {};

async function fetch(): Promise<void> {
  const channelId = '51533859'; // TODO
  const roomInfo = await axios
    .get(`https://api.frankerfacez.com/v1/room/id/${channelId}`)
    .then(({ data }: { data: FFZRoomInfo }) => data);
  const emotes: MyEmotes = {};
  for (const key in roomInfo.sets) {
    const set = roomInfo.sets[key];
    set.emoticons.forEach((emoticon) => {
      if (!emotes[emoticon.name]) {
        const size1 = emoticon.urls['1'];
        const size2 = emoticon.urls['2'];
        const url = size2 || size1;
        emotes[emoticon.name] = {
          static: `https:${url}`,
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
