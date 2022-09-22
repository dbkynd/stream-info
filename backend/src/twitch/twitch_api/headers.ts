import { getKeys } from '../../token';
import { getToken } from '../twitch_app_token';

export default function headers(): { [key: string]: string } {
  const keys = getKeys();
  return {
    authorization: `Bearer ${keys.access_token}`,
    'client-id': keys.client_id,
  };
}

export function appTokenHeaders(): { [key: string]: string } {
  const keys = getKeys();
  return {
    authorization: `Bearer ${getToken()}`,
    'client-id': keys.client_id,
  };
}
