import { Document, Schema, model } from 'mongoose';

const schema = new Schema({
  videoId: String,
  createdAt: Date,
  length: Number,
  locked: Boolean,
});

export interface ArchiveVideoDoc extends Document {
  videoId: string;
  createdAt: string;
  length: number;
  locked: boolean;
}

export interface ArchiveVideoBulkUpdate {
  updateOne: {
    filter: { videoId: string };
    update: {
      videoId: string;
      createdAt: string;
      length: number;
    };
    upsert: boolean;
  };
}

export default model<ArchiveVideoDoc>('archived_videos', schema);
