import TwitchUser, { TwitchUserDoc } from './twitch_user_model';

async function find(ids: string[]): Promise<TwitchUserDoc[]> {
  return TwitchUser.find({
    twitchId: { $in: ids },
  });
}

function create(users: TwitchUser[]): TwitchUserDoc[] {
  return users.map((x) => new TwitchUser({ twitchId: x.id, payload: x }));
}

function save(docs: TwitchUserDoc[]): void {
  TwitchUser.bulkSave(docs).catch();
}

function remove(docIds: string[]): void {
  TwitchUser.deleteMany({ _id: { $in: docIds } });
}

export default {
  find,
  create,
  save,
  remove,
};
