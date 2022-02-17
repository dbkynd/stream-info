import * as token from '../../../token';
import headers from '../headers';

describe('headers module', () => {
  test('gets the headers', () => {
    jest.spyOn(token, 'getKeys').mockImplementation(() => {
      return {
        access_token: 'foo',
        client_id: 'bar',
      };
    });

    expect(headers()).toEqual({
      authorization: 'Bearer foo',
      'client-id': 'bar',
    });
  });
});
