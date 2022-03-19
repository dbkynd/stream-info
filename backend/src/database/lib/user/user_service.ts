import User, { UserDoc } from './user_model';

async function updateProfile(profile: any): Promise<UserDoc> {
  return User.findOneAndUpdate(
    { twitchId: profile.id },
    { profile },
    { upsert: true, new: true },
  );
}

async function updateSettings(id: string, settings: any): Promise<void> {
  await User.findOneAndUpdate({ twitchId: id }, { settings });
}

async function getUser(id: string): Promise<UserDoc | null> {
  return User.findOne({ twitchId: id });
}

export default {
  updateProfile,
  updateSettings,
  getUser,
};
