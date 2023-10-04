import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { sidebarState } from '@/store/atoms/sidebarAtom';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Videos } from 'common';

export default function Home({ videos }: { videos: Videos[] }) {
  const sidebarOpen = useRecoilValue(sidebarState);

  return (
    <main className="bg-gray-950 text-white h-screen">
      <Header />
      <div className="flex">
        {sidebarOpen.isOpen && <Sidebar />}
        <Feed videos={videos} />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/videos');
  const videos = await res.data;

  return {
    props: {
      videos,
    },
  };
};
