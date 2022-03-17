import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  code: { type: String, index: true },
  id: String,
});

export interface EmoteDoc extends Document {
  code: string;
  id: string;
}

export default model<EmoteDoc>('emotes', schema);
