import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { sidebarState } from '@/store/atoms/sidebarAtom';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Videos } from 'common';
import { useSession } from 'next-auth/react';

export default function Home({ videos }: { videos: Videos[] }) {
  const sidebarOpen = useRecoilValue(sidebarState);
  const { data: session } = useSession();

  return (
    <main className="bg-gray-950 text-white h-screen overflow-y-hidden">
      <Header />
      {session ? (
        <div className="">
          {sidebarOpen.isOpen && <Sidebar />}
          <Feed videos={videos} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Please sign in</h1>
        </div>
      )}
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
