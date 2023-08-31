import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchVideos } from '../../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/Global/Navbar';

import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';

export default function CourseWatch() {
  const [videoPlayer, setVideoPlayer] = useState({
    active: {},
    videoList: [],
    sectionName: '',
    playerSize: 'full',
    isLocked: false,
    timeLeft: 30,
  });

  const { pathname } = useLocation();
  const { courses } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = pathname.split('/');

    const course = courses.find((course) => course.id === id[2]);

    if (!course.videos) {
      dispatch(fetchVideos(id[2]));
    } else {
      const section = course.videos.find((video) =>
        video.videos.find((video) => video.id === id[3]),
      );

      const video = section.videos.find((video) => video.id === id[3]);

      setVideoPlayer((prev) => ({
        ...prev,
        active: video,
        videoList: section.videos,
        sectionName: section.section,
      }));
    }
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
    </main>
  );
}
