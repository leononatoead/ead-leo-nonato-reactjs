import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { RiArrowUpSLine, RiPlayFill } from 'react-icons/ri';

export default function VideoList({ list, active, setVideoPlayer }) {
  const [listOptions, setListOptions] = useState({
    isHidden: true,
  });

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
    setListOptions((prev) => ({ ...prev, isHidden: !prev.isHidden }));
  };

  return (
    <div
      className={`absolute w-full bottom-0 bg-white overflow-hidden ${
        !listOptions?.isHidden && ' h-[50vh]'
      }`}
    >
      <div className='bg-gray-200 h-[92px] px-4 py-8  gap-11 flex items-center justify-between '>
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
              <RiPlayFill alt='next' />
            </button>
          )}
          <button onClick={handleOpenList}>
            <RiArrowUpSLine
              alt='view-all'
              className={` ${!listOptions.isHidden && 'rotate-180'}`}
            />
          </button>
        </div>
      </div>
      <ul
        className={`p-4 flex flex-col gap-4  ${
          listOptions.isHidden && 'hidden'
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