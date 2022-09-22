import CheerEvent from './cheer';
import RaidEvent from './raid';
import * as StateEvents from './state';
import * as SubscriptionEvents from './subscription';
import TipEvent from './tip';

export default {
  cheer: CheerEvent,
  raid: RaidEvent,
  state: StateEvents,
  subscription: SubscriptionEvents,
  tip: TipEvent,
};
