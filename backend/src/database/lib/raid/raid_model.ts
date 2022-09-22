import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  payload: Object,
  cleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export interface RaidDoc extends Document {
  payload: RaidPayload;
  cleared: boolean;
  createdAt: string;
}

export default model<RaidDoc>('raids', schema);
