import { whatnowRecord, whatnowResponse } from '../../../config';
import CountService from '../../../database/lib/count';
import { getLiveSubs } from '../../../twitch/twitch_polling/live_subs';

export default async (): Promise<string> => {
  const record = await CountService.get('liveSubs');
  const count = getLiveSubs().length;
  let response = whatnowResponse.replace('<COUNT>', count.toString());
  if (count > record) {
    response = response.replace('<RECORD>', whatnowRecord);
    await CountService.set('liveSubs', count);
  } else {
    response = response.replace('<RECORD>', '');
  }
  return response;
};
