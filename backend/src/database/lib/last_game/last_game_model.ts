import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  id: String,
  name: String,
});

export interface LastGameDoc extends Document {
  id: string;
  name: string;
}

export default model<LastGameDoc>('last_games', schema);
