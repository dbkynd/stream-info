import { Document, Schema, model } from 'mongoose';
import CountService from '../count';

const schema = new Schema({
  reporter: String,
  reported: String,
  message: String,
  discordMessageId: String,
  id: Number,
  createdAt: { type: Date, default: Date.now() },
});

schema.pre('save', function (next) {
  CountService.inc('discord_user_reports')
    .then((count) => {
      this.id = count;
      next();
    })
    .catch(next);
});

export interface DiscordUserReportDoc extends Document {
  reporter: string;
  reported: string;
  message: string;
  discordMessageId: string;
  id: number;
  createdAt: Date;
}

export default model<DiscordUserReportDoc>('discord_user_reports', schema);
