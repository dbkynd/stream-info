import { WebhookClient } from 'discord.js';
import LegacyRoleRequestService from '../../../database/lib/discord_legacy_role_request';

export default async (
  discordName: string,
  discordId: string,
  twitchName: string,
  twitchId: string,
): Promise<void> => {
  if (!process.env.DISCORD_LEGACY_REQUEST_URL)
    throw new Error('Missing DISCORD_LEGACY_REQUEST_URL');
  const hook = new WebhookClient({
    url: process.env.DISCORD_LEGACY_REQUEST_URL,
  });

  await LegacyRoleRequestService.save(
    discordName,
    discordId,
    twitchName,
    twitchId,
  );

  await hook.send({
    content: `${discordName} - <@${discordId}>\n${twitchName} - ${twitchId}\n<https://www.twitch.tv/popout/annemunition/viewercard/${twitchName}>`,
  });
};
