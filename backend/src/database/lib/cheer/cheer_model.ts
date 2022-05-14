import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  payload: Object,
  cleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export interface CheerDoc extends Document {
  payload: CheerPayload;
  cleared: boolean;
  createdAt: string;
}

export default model<CheerDoc>('cheers', schema);
