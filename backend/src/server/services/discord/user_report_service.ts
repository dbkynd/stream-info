import { WebhookClient } from 'discord.js';
import DiscordUserReportService from '../../../database/lib/discord_user_report';

const urlRegEx =
  /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g;

export default async (
  reporter: string,
  reported: string,
  message: string,
  files: Express.Multer.File[],
) => {
  if (!process.env.DISCORD_USER_REPORT_URL)
    throw new Error('Missing DISCORD_USER_REPORT_URL');
  const hook = new WebhookClient({ url: process.env.DISCORD_USER_REPORT_URL });

  const attachments = files.map((f) => {
    return {
      attachment: f.buffer,
      name: f.originalname,
    };
  });

  const doc = await DiscordUserReportService.save(reporter, reported, message);

  const msg = await hook.send({
    content: `@here\n\n${message.replace(urlRegEx, '<$1>')}`,
    username: `REPORT #${doc.id} | From: ${reporter} | Against: ${reported}`,
    files: attachments,
  });

  await DiscordUserReportService.addMsgId(doc, msg.id);
};
