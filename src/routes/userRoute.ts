import express from 'express';
import passport from 'passport';

import {
  deleteUser,
  getAllUsers,
  getLoginFailed,
  getSingleUser,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { adminOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL as string;

// route  -  /api/v1/user/register
router.post('/register', singleUpload, registerUser);

// route  -  /api/v1/user/login
router.post('/login', loginUser);

//route - /api/v1/user/all
router.get('/all', adminOnly, getAllUsers);

router
  .route('/:userId')
  .get(getSingleUser)
  .delete(deleteUser)
  .put(singleUpload, updateUser);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['profile'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);
/*
router.get('/login/failed', getLoginFailed);

router.get('/login/success', (request: Request, response: Response) => {
  if (request.user) {
    console.log(request.user);
    response.status(200).json({
      success: true,
      message: 'Successfully logged in',
      user: request.user,
      // cookies: request.cookies
    });
  }
});
passport.authenticate('jwt', { session: false });

router.get('/logout', (request: Request, response: Response) => {
  request.logout();
  response.redirect(CLIENT_URL);
});
*/
export default router;
