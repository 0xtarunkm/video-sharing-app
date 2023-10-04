import { HomeIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import {
  UserCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { data: session, status } = useSession();

  const router = useRouter();

  return (
    <div className="md:flex md:flex-col w-48 h-[calc(100vh-70px)] overflow-y-auto hidden">
      {/* top section */}
      <section className="flex flex-col items-center justify-center gap-y-4 py-4 mb-auto">
        <div className="sidebar-btn">
          <HomeIcon className="h-6" />
          <span>Home</span>
        </div>
        <div className="sidebar-btn">
          <VideoCameraIcon className="h-6" />
          <span>Videos</span>
        </div>
      </section>
      {/* bottom section */}
      <section className="border-t-[1px] border-gray-350 py-4">
        {!session ? (
          <section>
            <button className="btn" onClick={() => signIn()}>
              <UserCircleIcon className="h-7" />
              <span>Login</span>
            </button>
          </section>
        ) : (
          <section className="flex items-center space-x-3">
            <Image
              src={session?.user?.image!}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />

            <button className="btn" onClick={() => signOut()}>
              <ArrowLeftCircleIcon className="h-7" />
              <span>Logout</span>
            </button>
          </section>
        )}
      </section>
    </div>
  );
}
