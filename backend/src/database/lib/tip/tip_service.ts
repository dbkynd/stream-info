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
  return Tip.find({});
}

export default {
  create,
  save,
  list,
};
