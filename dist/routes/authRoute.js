import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import { singleUpload } from '../middlewares/multer.js';
import { deleteUser, getAllUsers, getLoginFailed, getLoginLocalSuccess, getLoginSuccess, getLogout, registerUser, updateUser, verifyUser, } from '../controllers/userController.js';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';
config();
const router = express.Router();
export const CLIENT_URL = process.env.CLIENT_URL;
// route  -  /auth/register
router.post('/register', singleUpload, registerUser);
// route  -  /auth/login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/login/local/success',
    failureRedirect: '/auth/login/failed',
}));
// route  -  /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// route  -  /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
    session: true,
}));
// route  -  /auth/github
router.get('/github', passport.authenticate('github', {
    scope: ['profile', 'email'],
}));
// route  -  /auth/github/callback
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: `/auth/login/success`,
    failureRedirect: '/auth/login/failed',
    session: true,
}));
// route  -  /auth/login/success
router.get('/login/success', getLoginSuccess);
// route  -  /auth/login/success
router.get('/login/local/success', getLoginLocalSuccess);
// route  -  /auth/reset/password
router.post('/reset/password', verifyUser);
// route  -  /auth/login/failed
router.get('/login/failed', getLoginFailed);
// route - /auth/logout
router.get('/logout', loggedInOnly, getLogout);
//route - /auth/all
router.get('/all', loggedInOnly, adminOnly, getAllUsers);
//route - /auth/profile/update
router.put('/profile/update', loggedInOnly, singleUpload, updateUser);
//route - /auth/profile/delete/:userId
router.delete('/profile/delete/:userId', loggedInOnly, deleteUser);
export default router;
