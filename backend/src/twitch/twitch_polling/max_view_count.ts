import CountService from '../../database/lib/count';

export default async (viewers: number) => {
  const count = await CountService.get('viewerCount');
  if (viewers > count) {
    await CountService.set('viewerCount', viewers);
  }
};
