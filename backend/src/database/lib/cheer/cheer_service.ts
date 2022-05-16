import { recordsToFetchOnConnect } from '../../../config';
import trim from '../trim';
import Cheer, { CheerDoc } from './cheer_model';

function create(payload: CheerPayload, createdAt?: string): CheerDoc {
  const doc = new Cheer({ payload });
  if (createdAt) doc.createdAt = createdAt;
  return doc;
}

async function save(doc: CheerDoc): Promise<void> {
  await doc.save();
  trim(Cheer).catch();
}

async function list(): Promise<CheerDoc[]> {
  return Cheer.find({}).sort({ createdAt: -1 }).limit(recordsToFetchOnConnect);
}

async function clear(id: string): Promise<void> {
  const doc = await Cheer.findById(id);
  if (!doc) return;
  doc.cleared = true;
  await doc.save();
}

async function clearAll(): Promise<void> {
  await Cheer.updateMany({ cleared: false }, { cleared: true });
}

export default {
  create,
  save,
  list,
  clear,
  clearAll,
};
