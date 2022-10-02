import { getAppState, getRoomstate } from '../../../events/state';
import * as token from '../../../token';

export default () => {
  return {
    validToken: token.isValid(),
    requiredScopes: token.getScopes(),
    appState: getAppState(),
    roomState: getRoomstate(),
  };
};
