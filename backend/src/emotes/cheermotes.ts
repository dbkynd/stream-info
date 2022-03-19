import twitchApi from '../twitch/twitch_api';

let cheermotes: Cheermote[] = [];

async function fetch(): Promise<void> {
  cheermotes = await twitchApi.getCheermotes();
}

function get(): Cheermote[] {
  return cheermotes;
}

export default {
  fetch,
  get,
};
