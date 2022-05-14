import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  payload: Object,
  cleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export interface TipDoc extends Document {
  payload: TipPayload;
  cleared: boolean;
  createdAt: string;
}

export default model<TipDoc>('tips', schema);
