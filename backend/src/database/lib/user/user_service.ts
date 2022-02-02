import User, { UserDoc } from './user_model';

async function update(profile: any): Promise<UserDoc> {
  return User.findOneAndUpdate(
    { twitchId: profile.id },
    { profile },
    { upsert: true, new: true },
  );
}

export default {
  update,
};
