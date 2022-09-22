import logger from '../logger';
import raidmode from './raidmode';
import seApi from './se_api';
import * as seWs from './se_socket';

let channelId: string;

export async function init() {
  if (!process.env.STREAMELEMENTS_JWT) {
    logger.warn('Missing Streamelements JWT');
    return;
  }

  let channelDetails;
  try {
    channelDetails = await seApi.getChannelDetails();
  } catch (e: any) {
    if (e.response.status === 401) {
      logger.error('Invalid streamelements JWT');
    } else {
      logger.error('Error getting streamelements channel details');
      logger.error(e);
    }
    return;
  }

  channelId = channelDetails._id;
  await seWs.connect();
  await raidmode.init();
}

export async function stop(): Promise<void> {
  await seWs.disconnect();
}

export function getChannelId(): string {
  return channelId;
}
