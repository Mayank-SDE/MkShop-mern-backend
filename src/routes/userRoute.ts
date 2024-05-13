import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { adminOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// route  -  /api/v1/user/register
router.post('/register', singleUpload, registerUser);

// route  -  /api/v1/user/login
router.post('/login', loginUser);

//route - /api/v1/user/all
router.get('/all', adminOnly, getAllUsers);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

/*
//route - /api/v1/user/:userId
router.get('/:userId', getSingleUser);

// route  -  /api/v1/user/update/:userId
router.put('/:userId', updateUser);

//router - /api/v1/user/delete/:userId
router.delete('/:userId', deleteUser);
*/
export default router;
