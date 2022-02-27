import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
  count: { type: Number, default: 0 },
});

export interface CountDoc extends Document {
  name: 'viewerCount' | 'liveSubs' | 'discord_user_reports';
  count: number;
}

export default model<CountDoc>('counts', schema);
