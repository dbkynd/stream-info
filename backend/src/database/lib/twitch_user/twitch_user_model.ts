import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  twitchId: { type: String, unique: true },
  payload: Object,
  expires: {
    type: Date,
    default: new Date().valueOf() + 1000 * 60 * 60 * 24 * 7,
  },
});

export interface TwitchUserDoc extends Document {
  twitchId: string;
  payload: TwitchUser;
  expires: string;
}

export default model<TwitchUserDoc>('twitch_users', schema);
