import { CommonUserstate } from 'tmi.js';
import EmoteService from '../database/lib/emote';
import logger from '../logger';

let queue: { [key: string]: string } = {};

setInterval(flush, 1000 * 60 * 5);

function add(userstate: CommonUserstate, message: string): void {
  const { emotes } = userstate;
  if (!emotes) return;
  for (const id in emotes) {
    const i = emotes[id][0].split('-');
    const code = message.slice(parseInt(i[0]), parseInt(i[1]) + 1);
    if (!queue[code]) {
      queue[code] = id;
    }
  }
}

function flush() {
  if (!Object.keys(queue).length) return;
  logger.debug('flushing twitch message emote queue');
  EmoteService.update(queue);
  queue = {};
}

async function get(words: string[]): Promise<MyEmotes> {
  const emotes: MyEmotes = {};
  const results = await EmoteService.find(words);
  results.forEach((emoticon) => {
    if (!emotes[emoticon.code]) {
      emotes[emoticon.code] = {
        static: `http://static-cdn.jtvnw.net/emoticons/v1/${emoticon.id}/1.0`,
        source: 'twitch',
      };
    }
  });
  return emotes;
}

export default {
  add,
  get,
};
