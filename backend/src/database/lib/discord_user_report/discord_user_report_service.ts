import DiscordUserReport, {
  DiscordUserReportDoc,
} from './discord_user_report_model';

async function save(
  reporter: string,
  reported: string,
  message: string,
): Promise<DiscordUserReportDoc> {
  return new DiscordUserReport({
    reporter,
    reported,
    message,
  }).save();
}

async function addMsgId(doc: DiscordUserReportDoc, id: string): Promise<void> {
  await DiscordUserReport.findByIdAndUpdate(doc._id, { discordMessageId: id });
}

export default {
  addMsgId,
  save,
};
