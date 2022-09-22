import defaults from '../../../server/defaultUserSettings';
import User, { UserDoc } from './user_model';

async function updateProfile(profile: any): Promise<UserDoc> {
  const user = await User.findOneAndUpdate(
    { twitchId: profile.id },
    { profile },
    { upsert: true, new: true },
  );
  if (!user.settings || !Object.keys(user.settings).length) {
    await updateSettings(profile.id, defaults);
    const newUser = await getUser(profile.id);
    if (newUser) return newUser;
  }
  return user;
}

async function updateSettings(id: string, settings: any): Promise<void> {
  const user = await getUser(id);
  if (!user) return;
  user.settings = Object.assign({}, user.settings, settings);
  await user.save();
}

async function getUser(id: string): Promise<UserDoc | null> {
  return User.findOne({ twitchId: id });
}

export default {
  updateProfile,
  updateSettings,
  getUser,
};
