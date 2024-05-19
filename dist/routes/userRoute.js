import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, updateUser, } from '../controllers/userController.js';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();
//route - /api/v1/user/all
router.get('/all', loggedInOnly, adminOnly, getAllUsers);
//route - /api/v1/user/userId
router
    .route('/:userId')
    .get(loggedInOnly, getSingleUser)
    .delete(loggedInOnly, deleteUser)
    .put(loggedInOnly, singleUpload, updateUser);
export default router;
