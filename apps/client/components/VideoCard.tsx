import { Videos } from 'common';
import moment from 'moment';
import Image from 'next/image';

export default function VideoCard({ video }: { video: Videos }) {
  return (
    <div className="flex flex-col m-2 cursor-pointer shadow-md shadow-gray-300 rounded-lg p-2">
      {/* top section */}
      <section className="flex items-center justify-between my-2">
        <span className="font-semibold">{video.admin.name}</span>
        <span>{moment(video.createdAt).fromNow()}</span>
      </section>

      {/* middle section */}
      <section>
        <Image src={video.thumbnail} width={520} height={320} alt="video" />
      </section>

      {/* bottom section */}
      <section className="my-2">
        <h3 className="font-semibold mb-2">{video.title}</h3>
        <p className="text-sm text-gray-500 truncate">{video.description}</p>
      </section>
    </div>
  );
}
