import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MediaCard } from 'ui';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export default function Videos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get('http://localhost:8000/api/admin/videos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setVideos(res.data.videos);
    };
    getVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-12 py-8">
      {videos.map((video: Video) => (
        <Link to={`/videos/${video.id}`} key={video.id}>
          <MediaCard
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
          />
        </Link>
      ))}
    </div>
  );
}
