import raidmode from '../../../streamelements/raidmode';

const enable = ['enable', 'on', 'yes', 'true', '1'];
const disable = ['disable', 'off', 'no', 'false', '0'];

export default async (action: string): Promise<string> => {
  if (enable.includes(action)) {
    return raidmode.manual(true);
  } else if (disable.includes(action)) {
    return raidmode.manual(false);
  }
  return 'Invalid action.';
};
