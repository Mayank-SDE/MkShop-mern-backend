import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from 'dotenv';
import { User, UserInterface } from '../models/user.js';
import mongoose from 'mongoose';
import ErrorHandler from './utilityClass.js';
import { comparePassword, hashPassword } from './password.js';

config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

// Local strategy for email and password login
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(new ErrorHandler('Incorrect username', 404), false);
      }
      const match = comparePassword(password, user.password);
      if (!match) {
        return done(new ErrorHandler('Incorrect password', 404), false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: (error: any, user?: UserInterface | boolean) => void
    ) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user && profile.emails) {
          user = await User.findOne({ email: profile.emails[0].value });
        }
        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            image: profile.photos ? profile.photos[0].value : 'assets/MK.png',
            password: await hashPassword(profile.id),
            dob: new Date('01/01/2000'),
            role: 'user',
            gender: 'male',
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: UserInterface | boolean) => void
    ) {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = await User.findOne({ githubProfileURL: profile.profileUrl });
        }
        if (!user) {
          user = await User.findOne({ email: `${profile.username}@gmail.com` });
        }
        if (!user) {
          const newUser = new User({
            githubId: profile.id,
            username: profile.username,
            githubProfileURL: profile.profileUrl,
            image: profile.photos ? profile.photos[0].value : 'assets/MK.png',
            password: await hashPassword(profile.id),
            dob: new Date('01/01/2000'),
            role: 'user',
            gender: 'male',
            email: `${profile.username}@gmail.com`,
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('Serialize User:', user);
  done(null, (user as UserInterface)._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log('Deserialize User ID:', _id);
    const user = await User.findById(_id);
    if (!user) {
      console.error('User not found');
      return done(new Error('User not found'), null);
    }
    console.log('Found User:', user);
    done(null, user);
  } catch (err) {
    console.error('Error in deserializeUser:', err);
    done(err, null);
  }
});

/*
import passport from 'passport';

import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';

import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from 'passport-github2';

import { Strategy as LocalStrategy } from 'passport-local';
import { config } from 'dotenv';
import { User, UserInterface } from '../models/user.js';
import mongoose from 'mongoose';
import ErrorHandler from './utilityClass.js';
import { comparePassword, hashPassword } from './password.js';

config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log('username', username);
    console.log('password', password);
    try {
      const user: UserInterface | null = await User.findOne({
        username: username,
      });

      if (!user) {
        return done(new ErrorHandler('Incorrect username', 404), false);
      }
      const match = comparePassword(password, user.password);
      const generatedPassword = await hashPassword(password);
      console.log('entered password', generatedPassword);
      console.log('database password', user.password);
      console.log('Comparing password', match);
      if (!match) {
        return done(new ErrorHandler('Incorrect password', 404), false);
      }
      console.log('user from passport local', user);

      done(null, user);
    } catch (err) {
      console.log('error from passport local', err);
      done(err, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: (error: any, user?: UserInterface | boolean) => void
    ) {
      try {
        let user: UserInterface | null = await User.findOne({
          googleId: profile.id,
        });
        if (!user) {
          if (profile.emails) {
            user = await User.findOne({ email: profile.emails[0].value });
          }
        }
        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            image: profile.photos ? profile.photos[0].value : 'assets/MK.png',
            password: await hashPassword(profile.id),
            dob: new Date('01/01/2000'),
            role: 'user',
            gender: 'male',
          });
          await newUser.save();

          console.log('new user', newUser);
          return done(null, newUser);
        }
        console.log('already ', user);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: any) => void
    ) {
      try {
        let user: UserInterface | null = await User.findOne({
          githubId: profile.id,
        });
        if (!user) {
          user = await User.findOne({ githubProfileURL: profile.profileUrl });
        }
        if (!user) {
          user = await User.findOne({ email: `${profile.username}@gmail.com` });
        }
        if (!user) {
          let newUser = new User({
            githubId: profile.id,
            username: profile.username,
            githubProfileURL: profile.profileUrl,
            image: profile.photos ? profile.photos[0].value : 'assets/MK.png',
            password: await hashPassword(profile.id),
            dob: new Date('01/01/2000'),
            role: 'user',
            gender: 'male',
            email: `${profile.username}@gmail.com`,
          });

          await newUser.save();

          return done(null, newUser);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//This will persist the user data inside the session.
//This serializeUser method will persist the session object user data. When we are login in using the username and password.
passport.serializeUser((user, done) => {
  console.log('serialize user user id', user);
  done(null, (user as UserInterface)._id as string);
});

//This deserializeUser will fetch the session object based on the session id that is stores inside the session object.
passport.deserializeUser(async (_id: string, done) => {
  try {
    console.log('Deserialize User ID (before conversion):', _id);
    const objectId = new mongoose.Types.ObjectId(_id);
    console.log('Deserialize User ID (after conversion):', objectId);
    const user = await User.findById(objectId);
    console.log('Found User:', user);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (err) {
    console.error('Error in deserializeUser:', err);
    done(err);
  }
});
*/
