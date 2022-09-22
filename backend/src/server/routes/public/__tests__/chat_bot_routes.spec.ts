import express from 'express';
import request from 'supertest';
import * as ClipsService from '../../../services/clips/clips_service';
import * as GamesService from '../../../services/games/games_service';
import * as SongService from '../../../services/song/song_service';
import * as TimeService from '../../../services/time/time_service';
import * as UptimeService from '../../../services/uptime/uptime_service';
import * as WhatnowService from '../../../services/whatnow/whatnow_service';
import chatBotRoutes from '../chat_bot';

const app = express();
app.use(chatBotRoutes);

const req = request(app);
process.env.STREAMELEMENTS_TOKEN = 'someToken';

describe('chatBot routes module', () => {
  describe('GET /clips', () => {
    test('400 - no token', (done) => {
      req.get('/clips').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/clips?token=invalid').expect(401, done);
    });

    test('400 - no target', (done) => {
      req.get('/clips?token=someToken&action=add').expect(400, done);
    });

    test('400 - no action', (done) => {
      req.get('/clips?token=someToken&target=dbkynd').expect(400, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(ClipsService, 'default').mockImplementationOnce(() => {
        return Promise.resolve('Clips response');
      });
      req
        .get('/clips?token=someToken&action=add&target=dbkynd')
        .expect(200, 'Clips response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(ClipsService, 'default').mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });
      req.get('/clips?token=someToken&action=add&target=dbkynd').expect(500, done);
    });
  });

  describe('GET /games', () => {
    test('400 - no token', (done) => {
      req.get('/games').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/games?token=invalid').expect(401, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(GamesService, 'default').mockImplementationOnce(() => {
        return Promise.resolve('Games response');
      });
      req.get('/games?token=someToken').expect(200, 'Games response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(GamesService, 'default').mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });
      req.get('/games?token=someToken').expect(500, done);
    });
  });

  describe('GET /song', () => {
    test('400 - no token', (done) => {
      req.get('/song').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/song?token=invalid').expect(401, done);
    });

    test('400 - no user', (done) => {
      req.get('/song?token=someToken').expect(400, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(SongService, 'default').mockImplementationOnce(() => {
        return Promise.resolve('Song response');
      });
      req.get('/song?token=someToken&user=someUser').expect(200, 'Song response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(SongService, 'default').mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });
      req.get('/song?token=someToken&user=someUser').expect(500, done);
    });
  });

  describe('GET /time', () => {
    test('400 - no token', (done) => {
      req.get('/time').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/time?token=invalid').expect(401, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(TimeService, 'default').mockImplementationOnce(() => {
        return 'Time response';
      });
      req.get('/time?token=someToken').expect(200, 'Time response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(TimeService, 'default').mockImplementation(() => {
        throw new Error('Mock Error');
      });
      req.get('/time?token=someToken').expect(500, done);
    });
  });

  describe('GET /uptime', () => {
    test('400 - no token', (done) => {
      req.get('/uptime').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/uptime?token=invalid').expect(401, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(UptimeService, 'default').mockImplementationOnce(() => {
        return 'Uptime response';
      });
      req.get('/uptime?token=someToken').expect(200, 'Uptime response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(UptimeService, 'default').mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });
      req.get('/uptime?token=someToken').expect(500, done);
    });
  });

  describe('GET /whatnow', () => {
    test('400 - no token', (done) => {
      req.get('/whatnow').expect(400, done);
    });

    test('401 - bad token', (done) => {
      req.get('/whatnow?token=invalid').expect(401, done);
    });

    test('200 - OK', (done) => {
      jest.spyOn(WhatnowService, 'default').mockImplementationOnce(() => {
        return Promise.resolve('Whatnow response');
      });
      req.get('/whatnow?token=someToken').expect(200, 'Whatnow response', done);
    });

    test('500 - Error', (done) => {
      jest.spyOn(WhatnowService, 'default').mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });
      req.get('/whatnow?token=someToken').expect(500, done);
    });
  });
});
