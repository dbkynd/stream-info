import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  twitchId: { type: String, unique: true },
  profile: Object,
  settings: Object,
});

export interface UserDoc extends Document {
  twitchId: string;
  profile: any;
  settings: any;
}

export default model<UserDoc>('users', schema);
