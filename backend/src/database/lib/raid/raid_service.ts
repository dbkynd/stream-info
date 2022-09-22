import { recordsToFetchOnConnect } from '../../../config';
import trim from '../trim';
import Host, { RaidDoc } from './raid_model';

function create(payload: RaidPayload): RaidDoc {
  return new Host({ payload });
}

async function save(doc: RaidDoc): Promise<void> {
  await doc.save();
  trim(Host).catch();
}

async function list(): Promise<RaidDoc[]> {
  return Host.find({}).sort({ createdAt: -1 }).limit(recordsToFetchOnConnect);
}

async function clear(id: string): Promise<void> {
  const doc = await Host.findById(id);
  if (!doc) return;
  doc.cleared = true;
  await doc.save();
}

async function clearAll(): Promise<void> {
  await Host.updateMany({ cleared: false }, { cleared: true });
}

export default {
  create,
  save,
  list,
  clear,
  clearAll,
};
