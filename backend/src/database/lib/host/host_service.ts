import Host, { HostDoc } from './host_model';

function create(payload: HostPayload): HostDoc {
  return new Host({ payload });
}

async function save(doc: HostDoc): Promise<HostDoc> {
  return doc.save();
}
async function list(): Promise<HostDoc[]> {
  return Host.find({}).sort({ _id: -1 }).limit(15);
}

export default {
  create,
  save,
  list,
};
