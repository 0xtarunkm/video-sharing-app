import { Request, Response } from 'express';
import {
  generateThumbnailSignedUrl,
  generateVideoSignedUrl,
} from '../config/S3';

export const getVideoSignedURL = async (req: Request, res: Response) => {
  try {
    const signedURL = await generateVideoSignedUrl();
    res.status(200).json({ signedURL });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getThumbnailSignedURL = async (req: Request, res: Response) => {
  try {
    const signedURL = await generateThumbnailSignedUrl();
    res.status(200).json({ signedURL });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
