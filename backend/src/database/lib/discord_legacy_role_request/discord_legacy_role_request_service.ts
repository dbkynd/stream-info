import LegacyRoleRequest from './discord_legacy_role_request_model';

async function save(
  discordName: string,
  discordId: string,
  twitchName: string,
  twitchId: string,
) {
  return new LegacyRoleRequest({
    discordName,
    discordId,
    twitchName,
    twitchId,
  });
}

export default {
  save,
};
