import TwitchUserService from '../../database/lib/twitch_user';
import logger from '../../logger';
import twitchApi from '../twitch_api';

export default async (ids: string[]): Promise<TwitchUser[]> => {
  // Remove duplicates
  ids = Array.from(new Set(ids));
  logger.debug(`Searching database for info on ${ids.length} users`);
  // Get all the users we can from our database
  const usersInDatabase = await TwitchUserService.find(ids);
  // Make an array of just ids for easier searching
  const usersInDatabaseIdsArray = usersInDatabase.map((x) => x.twitchId);
  logger.debug(`Database held info on ${usersInDatabase.length} users`);
  const time = Date.now();
  // Get user ids not in the database or expired
  const usersToLookup = ids.filter((id) => {
    if (!usersInDatabaseIdsArray.includes(id)) return true;
    const doc = usersInDatabase.find((x) => x.twitchId === id);
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
