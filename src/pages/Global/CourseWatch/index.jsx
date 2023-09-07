import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchCourses,
  fetchVideos,
} from '../../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/Global/Navbar';

import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import PremiumContent from '../../../components/Global/PremiumContent';

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
  });

  const [locked, setLocked] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const pathParams = pathname.split('/');
    const id = pathParams[2];
    const videoId = pathParams[3];

    if (!courses) {
      dispatch(fetchCourses());
      return;
    } else if (courses) {
      const findCourse = courses?.find((course) => course.id === id);

      if (!findCourse.videos) {
        dispatch(fetchVideos(id));
      } else {
        const section = findCourse.videos.find((video) =>
          video.videos.find((video) => video.id === videoId),
        );

        if (!section) {
          navigate('/');
          return;
        }

        const video = section.videos.find((video) => video.id === videoId);

        setVideoPlayer((prev) => ({
          ...prev,
          active: video,
          videoList: section.videos,
          sectionName: section.section,
        }));
      }
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
    <main className='min-h-screen bg-[#F3F3F3] flex flex-col'>
      <Navbar title={videoPlayer?.sectionName} />
      {videoPlayer?.videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className='flex flex-col flex-1'>
          <VideoPlayer
            video={videoPlayer?.active}
            size={videoPlayer?.playerSize}
            setVideoPlayer={setVideoPlayer}
          />

          <div className='bg-[#F3F3F3] flex-1'></div>
          <VideoList
            list={videoPlayer?.videoList}
            active={videoPlayer?.active}
            setVideoPlayer={setVideoPlayer}
          />
        </div>
      )}
      <PremiumContent
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
