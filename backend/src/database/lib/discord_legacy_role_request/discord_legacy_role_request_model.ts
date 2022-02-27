import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  discordName: String,
  discordId: String,
  twitchName: String,
  twitchId: String,
  createdAt: { type: Date, default: Date.now() },
});

export interface LegacyRoleRequestDoc extends Document {
  discordName: string;
  discordId: string;
  twitchName: string;
  twitchId: string;
  createdAt: Date;
}

export default model<LegacyRoleRequestDoc>('legacy_role_requests', schema);
