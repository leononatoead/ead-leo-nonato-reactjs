import { useRef, useState } from "react";
import useVideoPlayer from "../../../hooks/useVideoPlayer";

import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

export default function VideoPlayer({ video }) {
  const videoRef = useRef(null);

  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const {
    videoPlayerState,
    togglePlayingState,
    updateVideoTime,
    toggleVideoTime,
    toggleFullScreen,
    toggleVolume,
  } = useVideoPlayer(videoRef);

  return (
    <Box className="flex w-full flex-col items-start justify-between p-4 lg:max-h-[516px] lg:min-h-[516px]">
      <Box
        className={`group relative min-w-full overflow-hidden rounded-lg bg-black lg:max-h-[500px] lg:min-h-[500px]`}
      >
        <video
          ref={videoRef}
          src={video?.videoPath}
          onTimeUpdate={updateVideoTime}
          className="max-h-[80vh] min-w-full rounded-lg lg:max-h-[500px] lg:min-h-[500px]"
          preload="auto"
          controls={isLargerThanLg ? false : true}
        />
        {isLargerThanLg && (
          <>
            {videoPlayerState?.percentage === 0 ? (
              <Box className="absolute top-0 flex h-full w-full items-center justify-center bg-black">
                <button onClick={togglePlayingState}>
                  <FaPlay className="text-gray-100" size={40} />
                </button>
              </Box>
            ) : (
              <Box className="show-controls absolute bottom-0 left-0 right-0 mx-4 mb-4 hidden gap-4 rounded-md border border-white/20 bg-white/95 px-4  py-3 backdrop-blur-xl backdrop-filter group-hover:flex">
                <button onClick={togglePlayingState}>
                  {videoPlayerState?.playing ? <FaPause /> : <FaPlay />}
                </button>

                <Slider
                  defaultValue={0}
                  min={0}
                  max={100}
                  value={videoPlayerState?.percentage || 0}
                  onChange={toggleVideoTime}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>

                <button
                  className="relative"
                  onClick={() => setShowVolumeSlider((prev) => !prev)}
                >
                  <>
                    {videoPlayerState?.volume === 0 ? (
                      <FaVolumeMute />
                    ) : videoPlayerState?.volume > 0.5 ? (
                      <FaVolumeUp />
                    ) : (
                      <FaVolumeDown />
                    )}
                  </>
                  <Box
                    className={`absolute -left-2 bottom-6 rounded-md bg-white p-2 pt-3 shadow-md ${
                      showVolumeSlider ? "" : "hidden"
                    }`}
                  >
                    <Slider
                      defaultValue={100}
                      orientation="vertical"
                      minH="12"
                      min={0}
                      max={1}
                      step={0.1}
                      value={videoPlayerState?.volume || 1}
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
          </>
        )}
      </Box>
    </Box>
  );
}
