import { VideoCameraIcon } from '@heroicons/react/24/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="px-6 py-2 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* left section */}
        <section className="flex items-center space-x-2">
          <VideoCameraIcon className="h-8 w-8 text-red-600" />
          <h1 className="font-semibold text-2xl ">MyTube</h1>
        </section>
        {/* right section */}
        <section>
          {session ? (
            <div className="flex items-center space-x-4">
              <Image
                src={`${session?.user?.image}`}
                width={40}
                height={40}
                alt={'profile picture'}
                className="rounded-full"
              />
              <button className="btn" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => signIn()}>
              Login
            </button>
          )}
        </section>
      </div>
    </nav>
  );
}
