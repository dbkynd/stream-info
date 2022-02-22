import Count from './count_model';

async function get(name: string): Promise<number> {
  const doc = await Count.findOne({ name });
  if (!doc) return 0;
  return doc.count;
}

async function set(name: string, count: number): Promise<void> {
  await Count.findOneAndUpdate({ name }, { name, count }, { upsert: true });
}

export default {
  get,
  set,
};
