import axios from 'axios';

let emoticons: MyEmotes = {};

async function fetch(): Promise<void> {
  const globalEmoteData = await axios
    .get('https://api.betterttv.net/3/cached/emotes/global')
    .then(({ data }: { data: BTTVGlobalEmotes }) => data);
  const globalEmotes: MyEmotes = {};
  globalEmoteData.forEach((emoticon) => {
    if (!globalEmotes[emoticon.code]) {
      globalEmotes[emoticon.code] = {
        static: `https://cdn.betterttv.net/emote/${emoticon.id}/2x`,
        source: 'bttv',
      };
    }
  });

  const channelId = '51533859'; // TODO
  const channelEmoteData = await axios
    .get(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`)
    .then(({ data }: { data: BTTVChannelEmotes }) => data);
  const channelEmotes: MyEmotes = {};
  channelEmoteData.channelEmotes.forEach((emoticon) => {
    if (!channelEmotes[emoticon.code]) {
      channelEmotes[emoticon.code] = {
        static: `https://cdn.betterttv.net/emote/${emoticon.id}/2x`,
        source: 'bttv',
      };
    }
  });

  emoticons = Object.assign(globalEmotes, channelEmotes);
}

function get() {
  return emoticons;
}

export default {
  fetch,
  get,
};
