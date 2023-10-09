import { useLocation, useNavigate } from 'react-router';
import { RiArrowUpSLine } from 'react-icons/ri';
import { MdOutlineSkipNext } from 'react-icons/md';

export default function VideoList({
  list,
  active,
  videoPlayer,
  setVideoPlayer,
}) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleSelectVideo = (id) => {
    const newActive = list.find((video) => video.id === id);
    setVideoPlayer((prev) => ({ ...prev, active: newActive }));

    const path = pathname.split('/');

    navigate(`/course/${path[2]}/${id}`);
  };

  const videoIndex = list.findIndex((value) => value.id === active.id);
  const nextVideo = list[videoIndex + 1];

  const handlePlayNext = () => {
    setVideoPlayer((prev) => ({ ...prev, active: nextVideo }));
    const path = pathname.split('/');

    navigate(`/course/${path[2]}/${nextVideo.id}`);
  };

  const handleOpenList = () => {
    setVideoPlayer((prev) => ({ ...prev, showVideoList: !prev.showVideoList }));
  };

  return (
    <div
      className={`w-full bottom-0 bg-white ${
        videoPlayer.showVideoList && 'flex-grow'
      }`}
    >
      <div className='bg-white h-[92px] px-4 py-8  gap-11 flex items-center justify-between '>
        <div>
          <p className='font-semibold text-[17px] leading-[22px]'>
            Reproduzindo {videoIndex + 1} de {list.length}
          </p>
          <p className='text-small leading-4 text-gray-800'>
            {nextVideo && `Próximo: ${nextVideo?.title}`}
          </p>
        </div>
        <div className='flex gap-5'>
          {nextVideo && (
            <button onClick={handlePlayNext}>
              <MdOutlineSkipNext alt='next' size={20} />
            </button>
          )}
          <button onClick={handleOpenList}>
            <RiArrowUpSLine
              size={25}
              alt='view-all'
              className={` ${videoPlayer.showVideoList && 'rotate-180'}`}
            />
          </button>
        </div>
      </div>
      <ul
        className={`p-4 flex flex-col gap-4  ${
          !videoPlayer.showVideoList && 'hidden'
        }`}
      >
        {list?.map((video) => (
          <li
            key={video.id}
            onClick={() => handleSelectVideo(video.id)}
            className={`cursor-pointer  ${
              active?.id === video.id && 'font-bold'
            }`}
          >
            <p>{video.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
