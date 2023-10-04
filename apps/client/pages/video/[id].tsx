import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoDescription from '@/components/VideoDescription';
import { sidebarState } from '@/store/atoms/sidebarAtom';
import { useRecoilValue } from 'recoil';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { videoInputType } from 'common';

export default function video({ video }: { video: videoInputType }) {
  const sidebarOpen = useRecoilValue(sidebarState);

  return (
    <main className="bg-gray-950 text-white h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <div>
        {sidebarOpen.isOpen && <Sidebar />}
        <VideoDescription
          title={video.title}
          description={video.description}
          url={video.url}
          createdAt={video.createdAt!}
        />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await axios.get(`http://localhost:3000/api/videos/${id}`);

  const video = res.data;

  return {
    props: {
      video,
    },
  };
};
