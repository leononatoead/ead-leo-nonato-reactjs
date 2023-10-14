import { useRef, useState } from 'react';
import useVideoPlayer from '../../../hooks/useVideoPlayer';

import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

import {
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeDown,
  FaVolumeUp,
} from 'react-icons/fa';
import { MdFullscreen } from 'react-icons/md';

export default function VideoPlayer({ video, size, setVideoPlayer }) {
  const videoRef = useRef(null);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const {
    videoPlayerState,
    togglePlayingState,
    updateVideoTime,
    toggleVideoTime,
    toggleFullScreen,
    toggleVolume,
  } = useVideoPlayer(videoRef);

  // const handleSetVideoSize = () => {
  //   if (size === 'full') {
  //     setVideoPlayer((prev) => ({ ...prev, playerSize: '[800px]' }));
  //   } else {
  //     setVideoPlayer((prev) => ({ ...prev, playerSize: 'full' }));
  //   }
  // };

  return (
    <Box className='flex flex-col items-start justify-between p-4 '>
      <Box
        className={`group relative rounded-lg bg-black overflow-hidden w-${size}`}
      >
        <video
          ref={videoRef}
          src={video.videoPath}
          onTimeUpdate={updateVideoTime}
          className='w-full max-h-[80vh] rounded-lg'
          preload='auto'
        />

        {videoPlayerState.percentage === 0 ? (
          <Box className='absolute w-full h-full bg-black top-0 flex items-center justify-center'>
            <button onClick={togglePlayingState}>
              <FaPlay className='text-gray-100' size={40} />
            </button>
          </Box>
        ) : (
          <Box className='absolute bottom-0 left-0 right-0 mx-4 mb-4 rounded-md px-4 py-3 bg-white/95 backdrop-blur-xl backdrop-filter border border-white/20  gap-4 hidden group-hover:flex show-controls'>
            <button onClick={togglePlayingState}>
              {videoPlayerState.playing ? <FaPause /> : <FaPlay />}
            </button>
            <Box>{`${videoPlayerState.currentTime.toFixed(0)}`}</Box>

            <Slider
              defaultValue={0}
              min={0}
              max={100}
              value={videoPlayerState.percentage}
              onChange={toggleVideoTime}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <Box>{` ${videoPlayerState.duration.toFixed(0)}`}</Box>
            <button
              className='relative'
              onClick={() => setShowVolumeSlider((prev) => !prev)}
            >
              <>
                {videoPlayerState.volume === 0 ? (
                  <FaVolumeMute />
                ) : videoPlayerState.volume > 0.5 ? (
                  <FaVolumeUp />
                ) : (
                  <FaVolumeDown />
                )}
              </>
              <Box
                className={`absolute bg-white p-2 pt-3 bottom-6 -left-2 rounded-md shadow-md ${
                  showVolumeSlider ? '' : 'hidden'
                }`}
              >
                <Slider
                  defaultValue={100}
                  orientation='vertical'
                  minH='12'
                  min={0}
                  max={1}
                  step={0.1}
                  value={videoPlayerState.volume}
                  onChange={toggleVolume}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </button>

            <button onClick={toggleFullScreen}>
              <MdFullscreen size={20} />
            </button>
          </Box>
        )}
        {/* <button
                onClick={() => handleSetVideoSize()}
                className='bg-sky-400 p-4 text-white font-bold mt-2'
                >
                {size === 'full' ? 'Diminuir' : 'Expandir'}
              </button> */}
      </Box>
    </Box>
  );
}
