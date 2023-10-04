import { sidebarState } from '@/store/atoms/sidebarAtom';
import { Bars3Icon } from '@heroicons/react/20/solid';
import {
  UserCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';
import { VideoCameraIcon } from '@heroicons/react/24/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';

export default function Header() {
  const { data: session, status } = useSession();

  const setIsOpen = useSetRecoilState(sidebarState);

  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-gray-350 border-b-[1px] py-2 sm:py-3 px-2 sticky top-0 bg-gray-950 z-20">
      {/* Left section */}
      <section className="flex items-center gap-x-4">
        <Bars3Icon
          className="h-6 cursor-pointer"
          onClick={() =>
            setIsOpen((prev) => ({
              ...prev,
              isOpen: !prev.isOpen,
            }))
          }
        />
        <div
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <VideoCameraIcon className="h-7 text-red-600" />
          <span className="font-bold text-2xl mb-1">MyTube</span>
        </div>
      </section>
      {/* Right section */}
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
    </div>
  );
}
