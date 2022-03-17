import Emote, { EmoteDoc } from './emote_model';

async function update(emotes: { [key: string]: string }) {
  const operations = [];
  for (const key in emotes) {
    operations.push({
      updateOne: {
        filter: { code: key },
        update: { $set: { id: emotes[key] } },
        upsert: true,
      },
    });
  }
  await Emote.collection.bulkWrite(operations);
}

async function find(words: string[]): Promise<EmoteDoc[]> {
  return Emote.find({ code: { $in: words } });
}

export default {
  update,
  find,
};
