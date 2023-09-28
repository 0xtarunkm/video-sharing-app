import express from 'express';
import { protectUser } from '../middlewares/protectUser';
import {
  commentVideo,
  deleteComment,
  getAllComments,
  getAllVideos,
  getVideo,
  getVideoLikes,
  likeVideo,
} from '../controllers/videoControllers';
const router = express.Router();

router.get('/:id', protectUser, getVideo);
router.get('/', protectUser, getAllVideos);
router
  .route('/like/:id')
  .get(protectUser, getVideoLikes)
  .post(protectUser, likeVideo);
router
  .route('/comment/:id')
  .post(protectUser, commentVideo)
  .get(protectUser, getAllComments)
  .delete(protectUser, deleteComment);

export default router;
