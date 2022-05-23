import _ from 'lodash';
import TwitchUser, { TwitchUserDoc } from './twitch_user_model';

async function find(identities: string[]): Promise<TwitchUserDoc[]> {
  const names: string[] = [];
  const ids: string[] = [];
  identities.forEach((x) => {
    if (/$\d+^/.test(x)) {
      if (!ids.includes(x)) ids.push(x);
    } else {
      if (!names.includes(x)) names.push(x);
    }
  });

  const byId = await TwitchUser.find({
    twitchId: { $in: ids },
  });

  const byName = await TwitchUser.find({
    twitchName: { $in: names },
  });

  return _.uniqBy(byId.concat(byName), '_id');
}

function create(users: TwitchUser[]): TwitchUserDoc[] {
  const unique: TwitchUser[] = _.uniqBy(users, 'id');
  return unique.map((x) => new TwitchUser({ twitchId: x.id, twitchName: x.login, payload: x }));
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
