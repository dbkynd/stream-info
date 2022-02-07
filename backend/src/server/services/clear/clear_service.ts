import CheerService from '../../../database/lib/cheer';
import HostService from '../../../database/lib/host';
import SubscriptionService from '../../../database/lib/subscription';
import TipService from '../../../database/lib/tip';
import * as io from '../../socket.io';

export default (name: string, id: string) => {
  io.emit('clear', { name, id });
  if (name === 'cheers') CheerService.clear(id).catch();
  if (name === 'hosts') HostService.clear(id).catch();
  if (name === 'subscriptions') SubscriptionService.clear(id).catch();
  if (name === 'tips') TipService.clear(id).catch();
};
