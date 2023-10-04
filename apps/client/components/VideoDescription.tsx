import { sidebarState } from '@/store/atoms/sidebarAtom';
import moment from 'moment';
import { useRecoilValue } from 'recoil';

export default function VideoDescription({
  title,
  description,
  createdAt,
  url,
}: {
  title: string;
  description: string;
  createdAt: Date;
  url: string;
}) {
  const sidebarOpen = useRecoilValue(sidebarState);

  return (
    <div
      className={`max-w-4xl mx-auto py-4 ${sidebarOpen.isOpen && 'opacity-40'}`}
    >
      <video
        src={url}
        controls
        className="w-full rounded-md shadow-md shadow-gray-300"
      />

      <div className="mt-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm">
          {moment(createdAt).format('MMM Do YY')}
        </p>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
