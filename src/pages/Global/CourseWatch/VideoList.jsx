import { useLocation, useNavigate } from 'react-router';
import { RiArrowUpSLine } from 'react-icons/ri';
import { MdOutlineSkipNext } from 'react-icons/md';
import { Box, Text } from '@chakra-ui/react';
import NextVideoIcon from '../../../assets/next-icon.svg';

export default function VideoList({ videoPlayer, setVideoPlayer }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const activeSectionName = videoPlayer.active.section;
  const activeSection = videoPlayer.videoList.find(
    (section) => section.section === activeSectionName,
  );

  const videoIndex = videoPlayer.allVideos.findIndex(
    (value) => value.id === videoPlayer.active.id,
  );

  const nextVideo = videoPlayer.allVideos[videoIndex + 1];

  const handleSelectVideo = (id) => {
    const newActive = videoPlayer.allVideos.find((video) => video.id === id);
    setVideoPlayer((prev) => ({ ...prev, active: newActive }));

    const path = pathname.split('/');

    navigate(`/course/${path[2]}/${id}`);
  };

  const handlePlayNext = () => {
    setVideoPlayer((prev) => ({ ...prev, active: nextVideo }));
    const path = pathname.split('/');

    navigate(`/course/${path[2]}/${nextVideo.id}`);
  };

  const handleOpenList = () => {
    setVideoPlayer((prev) => ({ ...prev, showVideoList: !prev.showVideoList }));
  };

  return (
    <Box
      className={`w-full bottom-0 bg-white ${
        videoPlayer.showVideoList && 'flex-grow'
      }`}
    >
      <Box className='bg-white h-[92px] px-4 py-8  gap-11 flex items-center justify-between '>
        <Box>
          <Text className='font-semibold text-[17px] leading-[22px]'>
            Reproduzindo{' '}
            {activeSection.videos.findIndex(
              (value) => value.id === videoPlayer.active.id,
            ) + 1}{' '}
            de {activeSection.videos.length}
          </Text>
          <Text className='text-small leading-4 text-gray-800'>
            {nextVideo && `Próximo: ${nextVideo?.title}`}
          </Text>
        </Box>
        <Box className='flex gap-5'>
          {nextVideo && (
            <button onClick={handlePlayNext} className='w-6'>
              <img src={NextVideoIcon} alt='next' className='!w-6 !h-6' />
            </button>
          )}
          <button onClick={handleOpenList}>
            <RiArrowUpSLine
              size={25}
              alt='view-all'
              className={` ${
                videoPlayer.showVideoList && 'rotate-180'
              } text-gray-950`}
            />
          </button>
        </Box>
      </Box>
      <ul
        className={`p-4 flex flex-col gap-4  ${
          !videoPlayer.showVideoList && 'hidden'
        }`}
      >
        {activeSection?.videos?.map((video) => (
          <li
            key={video.id}
            onClick={() => handleSelectVideo(video.id)}
            className={`cursor-pointer  ${
              videoPlayer.active?.id === video.id && 'font-bold'
            }`}
          >
            <Text className='text-base leading-5'>{video.title}</Text>
          </li>
        ))}
      </ul>
    </Box>
  );
}
