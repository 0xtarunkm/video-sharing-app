import { sidebarState } from '@/store/atoms/sidebarAtom';
import { useRecoilValue } from 'recoil';
import { Videos } from 'common';
import VideoCard from './VideoCard';

export default function Feed({ videos }: { videos: Videos[] }) {
  const sidebarOpen = useRecoilValue(sidebarState);

  console.log(videos);

  return (
    <div
      className={`grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 overflow-y-scroll h-screen px-4 pb-24 py-2 ${
        sidebarOpen.isOpen && 'opacity-40'
      } `}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
