import passport from 'passport';
import { Strategy as TwitchStrategy } from 'passport-twitch-new';
import UserService from '../database/lib/user';

const allowedIds = process.env.ALLOWED_IDS.split(',').map((x) => x.trim());

passport.use(
  new TwitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: process.env.TWITCH_CALLBACK_URL,
      scope: '',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any,
    ) => {
      if (!allowedIds.includes(profile.id))
        return done(null, false, { message: 'Not allowed.' });
      try {
        const user = await UserService.update(profile);
        done(null, user.twitchId);
      } catch (e) {
        done(e, false);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: string, done) => {
  done(null, user);
});

export default passport;
