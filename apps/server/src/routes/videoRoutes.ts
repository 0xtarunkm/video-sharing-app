import express from 'express';
import { protectUser } from '../middlewares/protectUser';
import {
  commentVideo,
  deleteComment,
  getAllComments,
  getAllVideos,
  getThumbnailSignedURL,
  getVideo,
  getVideoLikes,
  getVideoSignedURL,
  likeVideo,
} from '../controllers/videoControllers';
const router = express.Router();

router.get('/get-video-signed-url', getVideoSignedURL);
router.get('/get-thumbnail-signed-url', getThumbnailSignedURL);

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
