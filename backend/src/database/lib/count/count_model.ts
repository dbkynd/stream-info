import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
  count: Number,
});

export interface CountDoc extends Document {
  name: 'viewerCount' | 'liveSubs';
  count: number;
}

export default model<CountDoc>('counts', schema);
