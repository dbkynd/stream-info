import Tip, { TipDoc } from './tip_model';

function create(payload: TipPayload, createdAt?: string): TipDoc {
  const doc = new Tip({ payload });
  if (createdAt) doc.createdAt = createdAt;
  return doc;
}

async function save(doc: TipDoc): Promise<TipDoc> {
  return doc.save();
}

async function list(): Promise<TipDoc[]> {
  return Tip.find({}).sort({ _id: -1 }).limit(15);
}

async function clear(id: string): Promise<void> {
  const doc = await Tip.findById(id);
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
