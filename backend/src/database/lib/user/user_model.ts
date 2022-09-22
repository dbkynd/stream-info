import { Document, Schema, model } from 'mongoose';
import defaults from './defaultUserSettings';

const schema = new Schema({
  twitchId: { type: String, unique: true },
  profile: Object,
  settings: { type: Object, default: defaults },
});

export interface UserDoc extends Document {
  twitchId: string;
  profile: any;
  settings: any;
}

export default model<UserDoc>('users', schema);
