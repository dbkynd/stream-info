import logger from '../logger';

export default async function (follow: ES_ChannelFollow): Promise<void> {
  logger.debug(`New Follow from ${follow.user_name}`);
}
