import TwitchUserService from '../../database/lib/twitch_user';
import logger from '../../logger';
import twitchApi from '../twitch_api';

export default async (identities: string[]): Promise<TwitchUser[]> => {
  // Get all the users we can from our database
  logger.debug(`Searching database for info on ${identities.length} users`);
  const usersInDatabase = await TwitchUserService.find(identities);

  // Make an array of just ids for easier searching
  const usersInDatabaseIdsArray = usersInDatabase.map((x) => x.twitchId);
  const usersInDatabaseNamesArray = usersInDatabase.map((x) => x.twitchName);
  logger.debug(`Database held info on ${usersInDatabase.length} users`);

  const time = Date.now();

  // Get those not in the database or expired
  const usersToLookup = identities.filter((identity) => {
    if (!usersInDatabaseIdsArray.includes(identity)) return true;
    if (!usersInDatabaseNamesArray.includes(identity)) return true;
    const doc = usersInDatabase.find(
      (x) => x.twitchId === identity || x.twitchName === identity,
    );
    if (!doc) return true;
    return new Date(doc.expires).valueOf() <= time;
  });
  if (usersToLookup.length > 0)
    logger.debug(`${usersToLookup.length} users do not exist or are expired`);

  // Get user data from twitch
  const twitchResults = await twitchApi.getUsers(usersToLookup);
  if (usersToLookup.length > 0)
    logger.debug(`Got twitch data on ${twitchResults.length} users`);

  // Delete expired docs from database
  const expiredDocs = usersInDatabase
    .filter((x) => new Date(x.expires).valueOf() <= time)
    .map((x) => x._id);
  if (expiredDocs.length > 0) {
    await TwitchUserService.remove(expiredDocs);
    logger.debug(
      `Removed ${usersToLookup.length} expired users from the database`,
    );
  }

  // Create and save new docs
  const docs = TwitchUserService.create(twitchResults);
  logger.debug(`Saving ${docs.length} users to the database`);
  TwitchUserService.save(docs);
  const unexpiredDocs = usersInDatabase.filter(
    (x) => new Date(x.expires).valueOf() > time,
  );
  return unexpiredDocs.map((x) => x.payload).concat(docs.map((x) => x.payload));
};
