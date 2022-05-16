import { recordsToFetchOnConnect } from '../../../config';
import trim from '../trim';
import Tip, { TipDoc } from './tip_model';

function create(payload: TipPayload, createdAt?: string): TipDoc {
  const doc = new Tip({ payload });
  if (createdAt) doc.createdAt = createdAt;
  return doc;
}

async function save(doc: TipDoc): Promise<void> {
  await doc.save();
  trim(Tip).catch();
}

async function list(): Promise<TipDoc[]> {
  return Tip.find({}).sort({ createdAt: -1 }).limit(recordsToFetchOnConnect);
}

async function clear(id: string): Promise<void> {
  const doc = await Tip.findById(id);
  if (!doc) return;
  doc.cleared = true;
  await doc.save();
}

async function clearAll(): Promise<void> {
  await Tip.updateMany({ cleared: false }, { cleared: true });
}

export default {
  create,
  save,
  list,
  clear,
  clearAll,
};
