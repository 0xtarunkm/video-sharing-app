import express from 'express';
import {
  getThumbnailSignedURL,
  getVideoSignedURL,
} from '../controllers/videoControllers';
const router = express.Router();

router.get('/get-video-signed-url', getVideoSignedURL);
router.get('/get-thumbnail-signed-url', getThumbnailSignedURL);

export default router;
