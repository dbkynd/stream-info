import axios from 'axios';
import SusTerm from '../database/lib/sus_terms';
import logger from '../logger';

export default async function (follow: ES_ChannelFollow): Promise<void> {
  logger.debug(`New Follow from ${follow.user_name}`);
  const name = follow.user_name.toLowerCase();
  const terms = await SusTerm.list();
  const match = terms.find((x) => name.includes(x.name.toLowerCase()));
  if (!match) return;
  logger.debug(`Follow name matches sus term ${match.name}`);
  if (!process.env.DISCORD_SUS_FOLLOWER_URL) return;
  await axios.post(process.env.DISCORD_SUS_FOLLOWER_URL, {
    content: `@here \`\`${name}\`\` <https://www.twitch.tv/popout/annemunition/viewercard/${name}>`,
  });
}
