import Count, { CountDoc } from './count_model';

async function get(name: CountDoc['name']): Promise<number> {
  const doc = await Count.findOne({ name });
  if (!doc) return 0;
  return doc.count;
}

async function set(name: CountDoc['name'], count: number): Promise<void> {
  await Count.findOneAndUpdate({ name }, { name, count }, { upsert: true });
}

async function inc(name: CountDoc['name']): Promise<number> {
  const doc = await Count.findOneAndUpdate(
    { name },
    { $inc: { count: 1 } },
    { new: true, upsert: true },
  );
  return doc.count;
}

export default {
  get,
  set,
  inc,
};
