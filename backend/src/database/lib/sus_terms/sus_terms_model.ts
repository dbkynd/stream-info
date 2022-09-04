import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
});

export interface SusTermDoc extends Document {
  name: string;
}

export default model<SusTermDoc>('suspicious_terms', schema);
