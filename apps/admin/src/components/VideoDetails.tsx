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
    console.log(res.data.video);
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="text-center p-8">
      <div className="border-2 border-black rounded-md w-fit mx-auto">
        <video
          src={video.url}
          controls
          width={750}
          className="rounded-md"
        ></video>
      </div>
      {/* video details */}
      <div>
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-lg ">{video.description}</p>
      </div>
    </div>
  );
}
