import * as token from '../../../token';

export default () => {
  return {
    validToken: false, //token.isValid(),
    requiredScopes: token.getScopes(),
  };
};
