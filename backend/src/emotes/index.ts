import logger from '../logger';
import bttvEmotes from './bttv';
import cheermotes from './cheermotes';
import ffzEmotes from './ffz';
import twitchEmotes from './twitch';

const cheermoteReg = /^(\D*)(\d+)$/;

export async function init() {
  try {
    logger.debug('caching ffz emotes');
    await ffzEmotes.fetch();
  } catch (e) {}

  try {
    logger.debug('caching bttv emotes');
    await bttvEmotes.fetch();
  } catch (e) {}

  try {
    logger.debug('caching twitch channel cheermotes');
    await cheermotes.fetch();
  } catch (e) {}
}

export async function parseMessage(
  msg: string | undefined,
): Promise<ParsedEmotes> {
  const emotes: ParsedEmotes = {};
  if (!msg) return emotes;
  let index = 0;
  const words = msg.split(' ');

  const ffzEmoteData = ffzEmotes.get();
  const bttvEmoteData = bttvEmotes.get();
  const cheermoteData = cheermotes.get();
  const twitchCachedEmoteData = await twitchEmotes.get(words);

  words.forEach((word) => {
    const ffzWord = ffzEmoteData[word];
    const bttvWord = bttvEmoteData[word];
    const twitchWord = twitchCachedEmoteData[word];

    if (ffzWord) {
      if (emotes[word]) {
        emotes[word].pos.push(getPos(index, word));
      } else {
        emotes[word] = { ...ffzWord, pos: [getPos(index, word)] };
      }
    } else if (bttvWord) {
      if (emotes[word]) {
        emotes[word].pos.push(getPos(index, word));
      } else {
        emotes[word] = { ...bttvWord, pos: [getPos(index, word)] };
      }
    } else if (twitchWord) {
      if (emotes[word]) {
        emotes[word].pos.push(getPos(index, word));
      } else {
        emotes[word] = { ...twitchWord, pos: [getPos(index, word)] };
      }
    } else if (cheermoteReg.test(word)) {
      const match = word.match(cheermoteReg);
      if (match) {
        const [, prefix, value] = match;
        const found = cheermoteData.find((x) => x.prefix === prefix);

        if (found) {
          let tier = found.tiers[found.tiers.length - 1];
          for (let i = found.tiers.length - 1; i >= 0; i--) {
            if (parseInt(value) >= found.tiers[i].min_bits) break;
            if (i === 0) break;
            tier = found.tiers[i - 1];
          }

          const code = prefix + tier.id;
          if (emotes[code]) {
            emotes[code].pos.push(getPos(index, word));
          } else {
            emotes[code] = {
              static: tier.images.dark.static['1'],
              animated: tier.images.dark.animated['1'],
              source: 'cheermote',
              pos: [getPos(index, word)],
            };
          }
        }
      }
    }
    index += word.length + 1;
  });
  return emotes;
}

function getPos(index: number, word: string): { first: number; last: number } {
  return { first: index, last: index + word.length - 1 };
}
