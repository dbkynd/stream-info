import { Document, Schema, model } from 'mongoose';
import CountService from '../count';

const schema = new Schema({
  reporter: String,
  reported: String,
  message: String,
  discordMessageId: String,
  id: Number,
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
}

export default model<DiscordUserReportDoc>('discord_user_reports', schema);
