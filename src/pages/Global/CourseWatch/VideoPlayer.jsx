import React from 'react';

export default function VideoPlayer({ video, size, setVideoPlayer }) {
  const handleSetVideoSize = () => {
    if (size === 'full') {
      setVideoPlayer((prev) => ({ ...prev, playerSize: '[800px]' }));
    } else {
      setVideoPlayer((prev) => ({ ...prev, playerSize: 'full' }));
    }
  };

  return (
    <div className='flex flex-col items-start justify-between p-4 '>
      <div className={`w-${size} `}>
        <video
          src={video.videoPath}
          controls
          className='w-full max-h-[80vh]  rounded-lg'
        />
        {/* <button
          onClick={() => handleSetVideoSize()}
          className='bg-sky-400 p-4 text-white font-bold mt-2'
        >
          {size === 'full' ? 'Diminuir' : 'Expandir'}
        </button> */}
      </div>
    </div>
  );
}
