import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  channelId: { type: String, unique: true },
  channelName: String,
});

export interface ClipChannel extends Document {
  channelId: string;
  channelName: string;
}

export default model<ClipChannel>('clip_channels', schema);
