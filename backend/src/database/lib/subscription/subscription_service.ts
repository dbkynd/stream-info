import { recordsToFetchOnConnect } from '../../../config';
import trim from '../trim';
import Subscription, { SubscriptionDoc } from './subscription_model';

function create(payload: SubscriptionPayload, createdAt?: string): SubscriptionDoc {
  const doc = new Subscription({ payload });
  if (createdAt) doc.createdAt = createdAt;
  return doc;
}

async function save(doc: SubscriptionDoc): Promise<void> {
  await doc.save();
  trim(Subscription).catch();
}

async function list(): Promise<SubscriptionDoc[]> {
  return Subscription.find({}).sort({ createdAt: -1 }).limit(recordsToFetchOnConnect);
}

async function clear(id: string): Promise<void> {
  const doc = await Subscription.findById(id);
  if (!doc) return;
  doc.cleared = true;
  await doc.save();
}

async function clearAll(): Promise<void> {
  await Subscription.updateMany({ cleared: false }, { cleared: true });
}

export default {
  create,
  save,
  list,
  clear,
  clearAll,
};
