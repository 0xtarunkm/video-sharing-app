import express from 'express';
import {
  addVideo,
  deleteVideo,
  getAdminProfile,
  getVideo,
  login,
  register,
  updateAdminProfile,
  updateVideo,
} from '../controllers/adminControllers';
import { protectAdmin } from '../middlewares/protectAdmin';
import { getAllVideos } from '../controllers/videoControllers';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router
  .route('/profile')
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

router.post('/add-video', protectAdmin, addVideo);
router.put('/update-video/:id', protectAdmin, updateVideo);
router.delete('/delete-video/:id', protectAdmin, deleteVideo);
router.get('/videos', protectAdmin, getAllVideos);
router.get('/videos/:id', protectAdmin, getVideo);

export default router;
