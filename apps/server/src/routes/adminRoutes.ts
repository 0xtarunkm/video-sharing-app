import express from 'express';
import {
  getAdminProfile,
  login,
  register,
  updateAdminProfile,
} from '../controllers/adminControllers';
import { protectAdmin } from '../middlewares/protectAdmin';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router
  .route('/profile')
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

export default router;
