import trim from '../trim';
import Host, { HostDoc } from './host_model';

function create(payload: HostPayload): HostDoc {
  return new Host({ payload });
}

async function save(doc: HostDoc): Promise<void> {
  await doc.save();
  trim(Host).catch();
}

async function list(): Promise<HostDoc[]> {
  return Host.find({}).sort({ _id: -1 }).limit(15);
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
