import express from 'express';
import {
  getUserProfile,
  login,
  register,
  updateUserProfile,
} from '../controllers/userControllers';
import { protectUser } from '../middlewares/protectUser';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router
  .route('/profile')
  .get(protectUser, getUserProfile)
  .put(protectUser, updateUserProfile);

export default router;
