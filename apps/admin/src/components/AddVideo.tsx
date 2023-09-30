import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000/api';

const AddVideo: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string>('');
  const [videoURL, setVideoURL] = useState<string>('');
  const [isVideoLoading, setVideoIsLoading] = useState<boolean>(true);
  const [isThumbnailLoading, setThumbnailIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const getVideoSignedURL = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/video/get-video-signed-url`, {
        withCredentials: true,
      });
      return res.data.signedURL;
    } catch (error) {
      console.log(error);
    }
  };

  const getThumbnailSignedURL = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/video/get-thumbnail-signed-url`,
        {
          withCredentials: true,
        }
      );
      return res.data.signedURL;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSignedURLs = async () => {
      const thumbnailUrl = await getThumbnailSignedURL();
      const videoURL = await getVideoSignedURL();

      setThumbnailURL(thumbnailUrl.split('?')[0]);
      setVideoURL(videoURL.split('?')[0]);
    };
    getSignedURLs();
  }, []);

  useEffect(() => {
    const addVideo = async () => {
      await axios.put(videoURL!, videoFile!, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Video uploaded');
      setVideoIsLoading(false);
    };

    const addThumbnail = async () => {
      await axios.put(thumbnailURL!, thumbnail!, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Thumbnail uploaded');
      setThumbnailIsLoading(false);
    };

    if (videoFile && thumbnail) {
      addVideo();
      addThumbnail();
    }
  }, [videoFile, thumbnail]);

  const uploadVideo = async () => {
    try {
      await axios.post(
        `${BASE_URL}/admin/add-video`,
        {
          title,
          description,
          videoUrl: videoURL,
          thumbnailUrl: thumbnailURL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Video added successfully');
      navigate('/videos');
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a New Video</h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          id="title"
          placeholder="Enter the video title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          id="description"
          rows={4}
          placeholder="Enter a description for the video"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Thumbnail
        </label>
        <input
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="file"
          id="videoFile"
          accept="img/*"
          onChange={(e) => {
            setThumbnail(e.target.files![0]);
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="videoFile"
        >
          Video File
        </label>
        <input
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="file"
          id="videoFile"
          accept="video/*"
          onChange={(e) => {
            setVideoFile(e.target.files![0]);
          }}
          required
        />
      </div>
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700 ${
          isVideoLoading || isThumbnailLoading
            ? 'cursor-not-allowed disabled:opacity-50'
            : ''
        }`}
        disabled={isVideoLoading || isThumbnailLoading}
        onClick={uploadVideo}
      >
        Upload Video
      </button>
    </div>
  );
};

export default AddVideo;
