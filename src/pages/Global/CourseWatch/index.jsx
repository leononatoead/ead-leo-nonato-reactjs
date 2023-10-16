import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../../redux/modules/courses/actions';
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../../../components/Global/Navbar';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import PremiumCourse from '../../../components/Global/PremiumCourse';
import VideoContent from './VideoContent';
import { Box } from '@chakra-ui/react';
import AssetsList from './AssetsList';
import QuestionsList from './QuestionsList';

export default function CourseWatch() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  const [videoPlayer, setVideoPlayer] = useState({
    active: {},
    videoList: [],
    sectionName: '',
    playerSize: 'full',
    isLocked: false,
    timeLeft: 30,
    showVideoList: false,
    showAssetsList: false,
    showQuestionsList: false,
  });

  const [locked, setLocked] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const pathParams = pathname.split('/');
    const id = pathParams[2];
    const videoId = pathParams[3];
    const course = courses?.find((course) => course.id === id);

    if (!course?.videos) {
      dispatch(fetchVideos(id));
    }

    const video = course?.videos?.find((video) => video.id === videoId);

    const videoList = course?.sections
      ?.slice()
      .sort((a, b) => a.order - b.order)
      .map((section) => {
        return {
          section: section.sectionName,
          videos: course?.videos
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .filter((video) => video.section === section.sectionName),
        };
      });

    const allVideos = [];
    videoList?.map((section) =>
      section.videos?.forEach((video) => {
        allVideos.push(video);
      }),
    );

    if (video) {
      setVideoPlayer((prev) => ({
        ...prev,
        active: video,
        sectionName: video.section,
        videoList,
        allVideos,
      }));
    }

    if (!user) {
      setLocked(true);
    }

    // if (user && videoPlayer.active?.isPremium) {
    //   if (!user.courses.includes(id)) {
    //     setLocked(true);
    //   }
    // }
  }, [courses]);

  return (
    <main className='min-h-[100dvh] bg-[#F3F3F3] flex flex-col'>
      <Navbar title={videoPlayer?.sectionName} />
      {videoPlayer?.videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className='flex flex-col justify-between flex-1'>
          <Box>
            {videoPlayer?.active?.videoPath?.includes('firebasestorage') && (
              <VideoPlayer
                video={videoPlayer?.active}
                size={videoPlayer?.playerSize}
                setVideoPlayer={setVideoPlayer}
              />
            )}

            {videoPlayer?.active?.videoPath?.includes('youtube') && (
              <Box className='flex flex-col items-start justify-between p-4'>
                <iframe
                  className='w-full max-h-[80vh] rounded-lg min-h-[192px] md:min-h-[400px]'
                  src={videoPlayer.active.videoPath}
                  title={videoPlayer.active.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>
              </Box>
            )}

            {videoPlayer?.active?.videoFrame && (
              <Box className='flex flex-col items-start justify-between p-4 min-h-[192px]'>
                <iframe
                  className='w-full max-h-[80vh] rounded-lg min-h-[192px] md:min-h-[400px]'
                  id={videoPlayer.active.videoFrame.id}
                  src={videoPlayer.active.videoFrame.src}
                  allow='accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture'
                  allowFullScreen={true}
                ></iframe>
              </Box>
            )}

            {!videoPlayer.showVideoList &&
              !videoPlayer.showAssetsList &&
              !videoPlayer.showQuestionsList && (
                <VideoContent
                  videoData={videoPlayer?.active}
                  setVideoData={setVideoPlayer}
                />
              )}
          </Box>

          {!videoPlayer.showAssetsList && !videoPlayer.showQuestionsList && (
            <VideoList
              videoPlayer={videoPlayer}
              setVideoPlayer={setVideoPlayer}
            />
          )}

          {videoPlayer.showAssetsList && (
            <AssetsList
              assetList={videoPlayer.active.assetsList}
              videoPlayer={videoPlayer}
              setVideoPlayer={setVideoPlayer}
            />
          )}

          {videoPlayer.showQuestionsList && (
            <QuestionsList
              questionsList={videoPlayer.active.questionsList}
              videoPlayer={videoPlayer}
              setVideoPlayer={setVideoPlayer}
            />
          )}
        </div>
      )}
      <PremiumCourse
        open={locked}
        close={setLocked}
        title={'Conteúdo disponível para assinantes'}
        text={'Tenha acesso total a este curso assinando a plataforma'}
        btnText={'Assine já'}
        closeBtn={false}
      />
    </main>
  );
}
