import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
}

export default function VideoDetails() {
  const [video, setVideo] = useState<Video>({} as Video);
  const { id } = useParams();

  const getVideo = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/admin/videos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    setVideo(res.data.video);
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="text-center p-8">
      <div className="rounded-md w-fit mx-auto">
        <video
          src={video.url}
          controls
          width={750}
          className="rounded-md shadow-md shadow-gray-900"
        ></video>
      </div>
      {/* video details */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-700 text-sm">{video.description}</p>
      </div>
    </div>
  );
}
