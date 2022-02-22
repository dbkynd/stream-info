import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
  count: Number,
});

export interface CountDoc extends Document {
  name: string;
  count: number;
}

export default model<CountDoc>('counts', schema);
