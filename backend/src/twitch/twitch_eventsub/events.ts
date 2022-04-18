import secret from './secret';

const events: EventSub_Sub[] = [
  {
    type: 'channel.follow',
    version: '1',
    condition: {
      broadcaster_user_id: '51533859', // TODO
    },
    transport: {
      method: 'webhook',
      callback: process.env.TWITCH_EVENT_SUB_URL,
      secret,
    },
  },
];

export default function (): EventSub_Sub[] {
  return events;
}
