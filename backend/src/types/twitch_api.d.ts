interface HelixUserResponse {
  data: HelixUser[];
}

interface HelixUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
}

interface TwitchToken {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: number;
}
