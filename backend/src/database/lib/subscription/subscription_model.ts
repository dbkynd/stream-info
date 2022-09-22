import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  payload: Object,
  cleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export interface SubscriptionDoc extends Document {
  payload: SubscriptionPayload;
  cleared: boolean;
  createdAt: string;
}

export default model<SubscriptionDoc>('subscriptions', schema);
