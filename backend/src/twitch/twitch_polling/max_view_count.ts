import CountService from '../../database/lib/count';

export default async (stream: TwitchStream) => {
  if (!stream) return;
  const count = await CountService.get('viewerCount');
  if (stream.viewer_count > count) {
    await CountService.set('viewerCount', stream.viewer_count);
  }
};
