import passport from 'passport';
import { Strategy as GoogleStrategy, } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from 'dotenv';
import { User } from '../models/user.js';
import { compareSync, hashSync } from 'bcrypt';
config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({
            username: username,
        });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        done(null, user);
    }
    catch (err) {
        done(err, false);
    }
}));
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async function (accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({
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
                password: hashSync(profile.id, 12),
                dob: new Date('01/01/2000'),
                role: 'user',
                gender: 'male',
            });
            newUser.save();
            return done(null, newUser);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
}, async function (accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({
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
                password: hashSync(profile.id, 12),
                dob: new Date('01/01/2000'),
                role: 'user',
                gender: 'male',
                email: `${profile.username}@gmail.com`,
            });
            newUser.save();
            return done(null, newUser);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
//This will persist the user data inside the session.
//This serializeUser method will persist the session object user data. When we are login in using the username and password.
passport.serializeUser((user, done) => {
    done(null, user._id);
});
//This deserializeUser will fetch the session object based on the session id that is stores inside the session object.
passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});
