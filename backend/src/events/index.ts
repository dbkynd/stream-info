import CheerEvent from './cheer';
import HostEvent from './hosted';
import * as StatusEvents from './status';
import * as SubscriptionEvents from './subscription';
import TipEvent from './tip';

export default {
  cheer: CheerEvent,
  hosted: HostEvent,
  status: StatusEvents,
  subscription: SubscriptionEvents,
  tip: TipEvent,
};
