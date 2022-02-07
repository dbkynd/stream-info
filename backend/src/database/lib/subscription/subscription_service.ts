import Subscription, { SubscriptionDoc } from './subscription_model';

function create(
  payload: SubscriptionPayload,
  createdAt?: string,
): SubscriptionDoc {
  const doc = new Subscription({ payload });
  if (createdAt) doc.createdAt = createdAt;
  return doc;
}

function save(doc: SubscriptionDoc): Promise<SubscriptionDoc> {
  return doc.save();
}

async function list(): Promise<SubscriptionDoc[]> {
  return Subscription.find({}).sort({ _id: -1 }).limit(15);
}

async function clear(id: string): Promise<void> {
  const doc = await Subscription.findById(id);
  if (!doc) return;
  doc.cleared = true;
  await doc.save();
}

export default {
  create,
  save,
  list,
  clear,
};
