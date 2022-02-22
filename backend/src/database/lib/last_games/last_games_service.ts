import LastGame, { LastGameDoc } from './last_games_model';

async function list(): Promise<LastGameDoc[]> {
  return LastGame.find({}).sort({ _id: -1 });
}

async function remove(id: string): Promise<void> {
  await LastGame.findByIdAndRemove(id);
}

async function add(id: string, name: string): Promise<void> {
  await new LastGame({
    id,
    name,
  }).save();
}

export default {
  list,
  remove,
  add,
};
