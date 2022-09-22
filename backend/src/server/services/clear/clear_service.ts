import CheerService from '../../../database/lib/cheer';
import RaidService from '../../../database/lib/raid';
import SubscriptionService from '../../../database/lib/subscription';
import TipService from '../../../database/lib/tip';
import * as io from '../../socket.io';

function clearOne(name: string, id: string): void {
  io.emit('clear', { name, id });
  if (name === 'cheers') CheerService.clear(id).catch();
  if (name === 'raids') RaidService.clear(id).catch();
  if (name === 'subscriptions') SubscriptionService.clear(id).catch();
  if (name === 'tips') TipService.clear(id).catch();
}

function clearAll(): void {
  io.emit('clearAll');
  CheerService.clearAll().catch();
  RaidService.clearAll().catch();
  SubscriptionService.clearAll().catch();
  TipService.clearAll().catch();
}

export default {
  clearOne,
  clearAll,
};
