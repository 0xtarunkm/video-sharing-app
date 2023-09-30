import AWS from 'aws-sdk';
import { generateRandomString } from '../utils/generateRandomString';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
});

const randomString = generateRandomString(10);

const generateVideoSignedUrl = async () => {
  const signedURL = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.AWS_BUCKET_VIDEO_NAME,
    Key: `${randomString}-video`,
    Expires: 60,
  });

  return signedURL;
};

const generateThumbnailSignedUrl = async () => {
  const signedURL = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.AWS_BUCKET_THUMBNAIL_NAME,
    Key: `${randomString}-thumbnail`,
    Expires: 60,
  });

  return signedURL;
};

export { generateVideoSignedUrl, generateThumbnailSignedUrl };
