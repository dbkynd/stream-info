export const users: TwitchUserResponse = {
  data: [
    {
      id: '106711622',
      login: 'mismagpie',
      display_name: 'MisMagpie',
      type: '',
      broadcaster_type: 'partner',
      description:
        "Hello! I'm Magpie, Creator for Lazarus! #BleedPink I live in Colorado and love FPS's games that have a good adventure!! ",
      profile_image_url:
        'https://static-cdn.jtvnw.net/jtv_user_pictures/7da5af52-1c5a-41f0-bf4c-2b7ef63f1fae-profile_image-300x300.png',
      offline_image_url:
        'https://static-cdn.jtvnw.net/jtv_user_pictures/85b6b587-33b1-43b3-9bd3-c87f8cf63807-channel_offline_image-1920x1080.jpeg',
      view_count: 2468411,
      created_at: '2015-11-10T05:33:11Z',
    },
  ],
};

export const channels: TwitchChannelResponse = {
  data: [
    {
      broadcaster_id: '106711622',
      broadcaster_login: 'mismagpie',
      broadcaster_name: 'MisMagpie',
      broadcaster_language: 'en',
      game_id: '491931',
      game_name: 'Escape from Tarkov',
      title: "♡Chillin Killin'♡  !Coffee !Lazarus !Evasion !Socials",
      delay: 0,
    },
  ],
};

export const archivedVideos: TwitchUserVideosResponse = {
  data: [
    {
      id: '1466949652',
      stream_id: '46269326605',
      user_id: '106711622',
      user_login: 'mismagpie',
      user_name: 'MisMagpie',
      title: "♡Chillin Killin'♡  !Coffee !Lazarus !Evasion !Socials",
      description: '',
      created_at: '2022-04-25T22:45:44Z',
      published_at: '2022-04-25T22:45:44Z',
      url: 'https://www.twitch.tv/videos/1466949652',
      thumbnail_url:
        'https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/b7107eee436de6128bb8_mismagpie_46269326605_1650926740//thumb/thumb0-%{width}x%{height}.jpg',
      viewable: 'public',
      view_count: 14,
      language: 'en',
      type: 'archive',
      duration: '3h25m58s',
      muted_segments: null,
    },
  ],
  pagination: {
    cursor: 'eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MX19',
  },
};
