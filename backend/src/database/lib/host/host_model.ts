import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  payload: Object,
  cleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

export interface HostDoc extends Document {
  payload: HostPayload;
  cleared: boolean;
  createdAt: string;
}

export default model<HostDoc>('hosts', schema);
