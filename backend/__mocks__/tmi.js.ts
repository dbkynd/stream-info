const mock_Client = jest.fn().mockImplementation(() => {
  const events: any = {};
  return {
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn().mockImplementation((event: string, cb: any) => {
      events[event] = cb;
    }),
    once: jest.fn(),
    emit: function (event: string, ...args: unknown[]) {
      events[event](...args);
    },
    getUsername: jest.fn(),
    deletemessage: jest.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
    say: jest.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
  };
});

export default {
  Client: mock_Client,
  client: mock_Client,
};
