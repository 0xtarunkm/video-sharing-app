import { sidebarState } from '@/store/atoms/sidebarAtom';
import { useRecoilValue } from 'recoil';
import { Videos } from 'common';
import VideoCard from './VideoCard';

export default function Feed({ videos }: { videos: Videos[] }) {
  const sidebarOpen = useRecoilValue(sidebarState);

  console.log(videos);

  return (
    <div
      className={`${
        sidebarOpen.isOpen && 'opacity-40'
      } "grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4`}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
