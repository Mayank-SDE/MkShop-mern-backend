import passport from 'passport';

import { JwtFromRequestFunction, Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from 'passport-github2';

import { User } from '../models/user.js';

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

const GITHUB_CLIENT_ID = '';
const GITHUB_CLIENT_SECRET = '';

const FACEBOOK_CLIENT_ID = '';
const FACEBOOK_CLIENT_SECRET = '';

type OptsType = {
  jwtFromRequest: JwtFromRequestFunction<any>;
  secretOrKey: string;
};

const opts: OptsType = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.id }).exec();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: any) => void
    ) {
      done(null, profile);
      console.log(accessToken);
      console.log(refreshToken);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done: (error: any, user?: any) => void
    ) {
      done(null, profile);
      console.log(accessToken);
      console.log(refreshToken);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: (error: any, user?: any) => void
    ) {
      done(null, profile);
      console.log(accessToken);
      console.log(refreshToken);
    }
    /*  //It is going to give us accessToke , refreshToken , profile and an callback function.
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      //    Database configuration
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      // });

      /*
        if you are using the mongodb

        cons user={
        username:profile.displayName,
        avatar:profile.photos[0]
        }

        user.save();
        */
    /*
      done(null, profile);
    }*/
  )
);

/*serializeUser() is setting id as cookie in user's browser and passport. deserializeUser() is getting id from the cookie, which is then used in callback to get user info or something else, based on that id or some other piece of information from the cookie */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: typeof User, done) => {
  done(null, user);
});
