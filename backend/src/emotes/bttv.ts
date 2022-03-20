import path from 'path';
import axios from 'axios';
import gm from 'gm';
import { emotesDir } from '../directories';

let emoticons: MyEmotes = {};

async function fetch(): Promise<void> {
  const emotes: MyEmotes = {};

  const globalEmoteData = await axios
    .get('https://api.betterttv.net/3/cached/emotes/global')
    .then(({ data }: { data: BTTVGlobalEmotes }) => data);
  const channelId = '51533859'; // TODO
  const channelEmoteData = await axios
    .get(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`)
    .then(({ data }: { data: BTTVChannelEmotes }) => data);

  const globalGifs = globalEmoteData.filter((x) => x.imageType === 'gif');
  const channelGifs = channelEmoteData.channelEmotes.filter(
    (x) => x.imageType === 'gif',
  );
  const sharedGifs = channelEmoteData.sharedEmotes.filter(
    (x) => x.imageType === 'gif',
  );
  const gifs = [...globalGifs, ...channelGifs, ...sharedGifs];

  for (let i = 0; i < gifs.length; i++) {
    const buffer = await axios
      .get(`https://cdn.betterttv.net/emote/${gifs[i].id}/1x`, {
        responseType: 'arraybuffer',
      })
      .then(({ data }) => data);
    await savePNG(gifs[i].id, buffer);
  }

  function addEmotes(data: BTTVEmote[] | BTTVSharedEmote[]) {
    data.forEach((emoticon: BTTVEmote | BTTVSharedEmote) => {
      if (!emotes[emoticon.code]) {
        if (emoticon.imageType === 'gif') {
          emotes[emoticon.code] = {
            animated: `https://cdn.betterttv.net/emote/${emoticon.id}/1x`,
            static: `/emotes/${emoticon.id}.png`,
            source: 'bttv',
          };
        } else {
          emotes[emoticon.code] = {
            static: `https://cdn.betterttv.net/emote/${emoticon.id}/1x`,
            source: 'bttv',
          };
        }
      }
    });
  }

  addEmotes(globalEmoteData);
  addEmotes(channelEmoteData.channelEmotes);
  addEmotes(channelEmoteData.sharedEmotes);

  emoticons = emotes;
}

function savePNG(id: string, buffer: Buffer) {
  return new Promise((resolve, reject) => {
    const target = path.join(emotesDir, `${id}.png`);
    gm(buffer)
      .selectFrame(0)
      .write(target, (err) => {
        if (err) reject(err);
        resolve();
      });
  });
}

function get(): MyEmotes {
  return emoticons;
}

export default {
  fetch,
  get,
};
