import { PlusCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { userEmailState } from 'store';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';

const Header = () => (
  <header className="bg-blue-500 py-12 text-white text-center">
    <h1 className="text-2xl font-extrabold">Welcome to</h1>
    <h2 className="text-4xl font-extrabold">Video Sharing Application</h2>
  </header>
);

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="p-6 lg:w-1/3 text-center">
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 ">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

const GetStarted = () => (
  <section className="bg-gray-100 py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-semibold mb-8">Get Started Today!</h2>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="md:w-1/3">
          <div className="text-6xl font-extrabold text-blue-500">1</div>
          <p className="text-xl font-semibold mb-2">Sign Up</p>
          <p className="text-gray-600">
            Create your account to access all the features and start sharing
            your videos.
          </p>
        </div>
        <div className="md:w-1/3">
          <div className="text-6xl font-extrabold text-blue-500">2</div>
          <p className="text-xl font-semibold mb-2">Explore</p>
          <p className="text-gray-600">
            Dive into our vast video library and discover content that interests
            you.
          </p>
        </div>
        <div className="md:w-1/3">
          <div className="text-6xl font-extrabold text-blue-500">3</div>
          <p className="text-xl font-semibold mb-2">Upload</p>
          <p className="text-gray-600">
            Share your own videos, whether it's tutorials, entertainment, or
            more!
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Homepage = () => (
  <div>
    <Header />
    <section className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-12 text-center">
        Discover, Share, and Connect through Videos
      </h2>
      <div className="flex items-center justify-evenly">
        <Feature
          title="Explore a World of Videos"
          description="Discover a vast library of videos on various topics and genres. Stay up-to-date with the latest trends and popular videos."
          icon={
            <Link to="/videos">
              <VideoCameraIcon className="h-12 hover:scale-110 duration-300 cursor-pointer" />
            </Link>
          }
        />
        <Feature
          title="Share Your Creativity"
          description="Upload your own videos, engage with your audience through likes, comments, and shares. Connect with your favorite creators."
          icon={
            <Link to="/add-video">
              <PlusCircleIcon className="h-12 hover:scale-110 duration-300 cursor-pointer" />
            </Link>
          }
        />
      </div>
    </section>
    <GetStarted />
  </div>
);

export default function Home() {
  const userEmail = useRecoilValue(userEmailState);

  return (
    <div>
      {userEmail ? (
        <Homepage />
      ) : (
        <div className="text-center mt-10">
          <h1 className="font-bold text-4xl">Please login to continue</h1>
        </div>
      )}
    </div>
  );
}
