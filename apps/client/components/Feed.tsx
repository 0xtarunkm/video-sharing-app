import { sidebarState } from '@/store/atoms/sidebarAtom';
import { useRecoilValue } from 'recoil';
import { Videos } from 'common';
import VideoCard from './VideoCard';
import Link from 'next/link';

export default function Feed({ videos }: { videos: Videos[] }) {
  const sidebarOpen = useRecoilValue(sidebarState);

  return (
    <div
      className={`grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 overflow-y-scroll h-screen px-4 pb-24 py-2 scrollbar-hide ${
        sidebarOpen.isOpen && 'opacity-40'
      } `}
    >
      {videos.map((video) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
}
