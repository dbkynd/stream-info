import { getKeys } from '../../token';

export default function headers(): { [key: string]: string } {
  const keys = getKeys();
  return {
    authorization: `Bearer ${keys.access_token}`,
    'client-id': keys.client_id,
  };
}
