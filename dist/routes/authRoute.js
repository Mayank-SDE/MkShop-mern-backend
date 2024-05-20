import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import { singleUpload } from '../middlewares/multer.js';
import { getLoginFailed, getLoginSuccess, getLogout, registerUser, } from '../controllers/userController.js';
import { loggedInOnly } from '../middlewares/auth.js';
config();
const router = express.Router();
// const CLIENT_URL = process.env.CLIENT_URL as string;
// route  -  /auth/register
router.post('/register', singleUpload, registerUser);
// route  -  /auth/login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
}));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
}));
router.get('/github', passport.authenticate('github', {
    scope: ['profile', 'email'],
}));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
}));
router.get('/login/success', getLoginSuccess);
router.get('/login/failed', getLoginFailed);
router.get('/logout', loggedInOnly, getLogout);
export default router;
