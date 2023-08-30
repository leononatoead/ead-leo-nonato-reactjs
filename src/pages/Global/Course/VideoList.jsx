import { useState } from 'react';

import upArrow from '../../../assets/up-arrow.svg';
import next from '../../../assets/next.svg';

export default function VideoList({ list, active, setVideoPlayer }) {
  const [listOptions, setListOptions] = useState({
    isHidden: true,
  });

  const handleSelectVideo = (id) => {
    const newActive = list.find((video) => video.id === id);
    setVideoPlayer((prev) => ({ ...prev, active: newActive }));
  };

  const videoIndex = list.findIndex((value) => value.id === active.id);
  const nextVideo = list[videoIndex + 1];

  // const filter = list?.map((video) => video.section);

  // const sections = new Set(filter);
  // const sectionArr = [...sections];

  const handlePlayNext = () => {
    setVideoPlayer((prev) => ({ ...prev, active: nextVideo }));
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
      <div className='bg-[#EBEBEB] h-[92px] px-4 py-8  gap-11 flex items-center justify-between '>
        <div>
          <p className='font-semibold text-[17px] leading-[22px]'>
            Reproduzindo {videoIndex + 1} de {list.length}
          </p>
          <p className='text-[12px] leading-4 text-[#616161]'>
            {nextVideo && `Próximo: ${nextVideo?.title}`}
          </p>
        </div>
        <div className='flex gap-5'>
          {nextVideo && (
            <button onClick={handlePlayNext}>
              <img src={next} alt='next' />
            </button>
          )}
          <button onClick={handleOpenList}>
            <img
              src={upArrow}
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
        {/* {sectionArr.map((section, i) => (
          <li key={i}>
            <p>{section}</p>
            <ul>
              {videoList2.map(
                (video) => video.section === section && <li>{video.title}</li>,
              )}
            </ul>
          </li>
        ))} */}
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
