import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchVideos } from '../../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/Global/Navbar';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-components';

import useUserData from '../../../hooks/useUserData';
import VideoList from './videoList';
import VideoPlayer from './VideoPlayer';

export default function Course() {
  const [videoPlayer, setVideoPlayer] = useState({
    active: {},
    videoList: [],
    playerSize: 'full',
    isLocked: false,
    freePeriod: 30,
    timeLeft: 30,
  });

  const { id } = useParams();
  const { addCourseToUser } = useUserData();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((course) => course.id === id);

  const calculateViewTime = (createdAt) => {
    const mili = 24 * 60 * 60 * 100;
    const finalTime = new Date(createdAt + videoPlayer?.freePeriod * mili);
    const today = Date.now();
    const dif = Math.floor((finalTime - today) / mili);
    return dif;
  };

  useEffect(() => {
    const course = courses.find((course) => course.id === id);

    if (!course.videos) {
      dispatch(fetchVideos(id));
    } else {
      setVideoPlayer({
        active: course?.videos[0],
        videoList: course?.videos,
        freePeriod: 30,
      });
    }
  }, [courses, id]);

  useEffect(() => {
    if (user.courses?.length > 0) {
      const findCourse = user.courses.find((course) => course.courseId === id);

      if (findCourse) {
        const time = calculateViewTime(findCourse.createdAt);

        if (time === 0) {
          setVideoPlayer((prev) => ({
            ...prev,
            isLocked: true,
            timeLeft: time,
          }));
        } else {
          setVideoPlayer((prev) => ({
            ...prev,
            isLocked: false,
            timeLeft: time,
          }));
        }
      } else {
        const prev = [...user.courses];
        addCourseToUser(user.uid, id, prev);
      }
    } else {
      addCourseToUser(user.uid, id);
    }
  }, [user, id]);

  return (
    <main className='min-h-screen bg-[#F3F3F3] flex flex-col'>
      <Navbar title={course?.name} />
      {videoPlayer?.videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className='flex flex-col flex-1'>
          <div className='bg-red-500 text-white  text-center py-2'>
            Você tem {videoPlayer?.timeLeft} dias de conteúdo gratuito, após
            isso{' '}
            <Link to='/' className='font-medium border-b-white border-b-[1px]'>
              assine
            </Link>
          </div>
          <VideoPlayer
            video={videoPlayer?.active}
            size={videoPlayer?.playerSize}
            setVideoPlayer={setVideoPlayer}
          />
          <div className='px-4 py-2 bg-white'>
            <span className='text-xs'>{videoPlayer?.active?.section}</span>
            <Accordion collapsible className='accordion'>
              <AccordionItem value='1'>
                <AccordionHeader expandIconPosition='end'>
                  <span className='!text-[14px] !font-medium'>
                    {videoPlayer?.active?.title}
                  </span>
                </AccordionHeader>
                <AccordionPanel>
                  <p>{videoPlayer?.active?.description}</p>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
          {/* {videoSize !== 'full' && (
            <ul className='p-8 flex flex-col gap-4'>
              {videoList?.map((video) => (
                <li
                  key={video.id}
                  onClick={() => handleSelectVideo(video.id)}
                  className={`cursor-pointer font-bold ${
                    activeVideo?.id === video.id && 'text-sky-400'
                  }`}
                >
                  {video.title}
                </li>
              ))}
            </ul>
          )} */}
          {/* <ul className='flex flex-col gap-4 mt-8'>
            {activeVideo?.assets &&
              activeVideo.assets.map((asset, index) => (
                <li key={index} className='flex justify-between'>
                  <span>{asset.fileName}</span>
                  <a
                    href={asset.fileURL}
                    download
                    target='_blank'
                    className='text-sky-500 font-bold cursor-pointer'
                  >
                    Download
                  </a>
                </li>
              ))}
          </ul> */}

          <div className='bg-[#F3F3F3] flex-1'>
            <div className='flex items-center w-full bg-white mt-[-1px]'>
              <span className='px-3 py-2 cursor-pointer border-b-2 border-[#005fb8]'>
                Materiais
              </span>
              <span className='px-3 py-2 cursor-pointer'>Capítulos</span>
              <span className='px-3 py-2 cursor-pointer'>Avaliações</span>
            </div>
          </div>
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
