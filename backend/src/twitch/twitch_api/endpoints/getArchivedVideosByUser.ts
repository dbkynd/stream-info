import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-videos

export default function getArchivedVideosByUser(
  userId: string,
  limit = 10,
): Promise<TwitchVideo[]> {
  const url = 'https://api.twitch.tv/helix/videos';
  const options = {
    headers: headers(),
    params: {
      user_id: userId,
      first: limit,
      type: 'archive',
    },
  };
  return axios.get(url, options).then(({ data }: { data: TwitchUserVideosResponse }) => data.data);
}
