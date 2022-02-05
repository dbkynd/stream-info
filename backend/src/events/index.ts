import CheerEvent from './cheer';
import HostEvent from './hosted';
import * as StateEvents from './state';
import * as SubscriptionEvents from './subscription';
import TipEvent from './tip';

export default {
  cheer: CheerEvent,
  hosted: HostEvent,
  state: StateEvents,
  subscription: SubscriptionEvents,
  tip: TipEvent,
};
