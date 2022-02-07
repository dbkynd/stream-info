import CheerService from '../../../database/lib/cheer';
import HostService from '../../../database/lib/host';
import SubscriptionService from '../../../database/lib/subscription';
import TipService from '../../../database/lib/tip';

export default (name: string, id: string) => {
  if (name === 'cheer') CheerService.clear(id).catch();
  if (name === 'host') HostService.clear(id).catch();
  if (name === 'subscription') SubscriptionService.clear(id).catch();
  if (name === 'tip') TipService.clear(id).catch();
};
