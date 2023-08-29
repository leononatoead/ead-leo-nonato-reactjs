import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideos } from '../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-components';

import upArrow from '../../assets/up-arrow.svg';
import next from '../../assets/next.svg';

export default function Course() {
  const [activeVideo, setActiveVideo] = useState();
  const [videoList, setVideoList] = useState();
  const [videoSize, setVideoSize] = useState();

  const { id } = useParams();

  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses.courses);

  const course = courses.find((course) => course.id === id);

  const handleSelectVideo = (id) => {
    const newActive = videoList.find((video) => video.id === id);
    setActiveVideo(newActive);
  };

  const handleSetVideoSize = () => {
    if (videoSize === 'full') {
      setVideoSize('[800px]');
    } else {
      setVideoSize('full');
    }
  };

  useEffect(() => {
    const course = courses.find((course) => course.id === id);

    if (!course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  useEffect(() => {
    const course = courses.find((course) => course.id === id);
    if (course.videos) {
      setActiveVideo(course?.videos[0]);
      setVideoList(course?.videos);
    }
  }, [courses, id]);

  return (
    <main className='min-h-screen bg-[#F3F3F3] flex flex-col'>
      <Navbar title={course?.name} />
      {videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col items-start justify-between p-4 '>
            <div className={`w-${videoSize} `}>
              <video
                src={activeVideo?.videoPath}
                controls
                className='w-full max-h-[80vh]  rounded-lg'
              />
              {/* <button
                onClick={() => handleSetVideoSize()}
                className='bg-sky-400 p-4 text-white font-bold mt-2'
              >
                {videoSize === 'full' ? 'Diminuir' : 'Expandir'}
              </button> */}
            </div>
          </div>
          <div className='px-4 py-2 bg-white'>
            <span className='text-xs'>
              O início da sua jornada como investidor
            </span>
            <Accordion collapsible className='accordion'>
              <AccordionItem value='1'>
                <AccordionHeader expandIconPosition='end'>
                  <span className='!text-[14px] !font-medium'>
                    {activeVideo?.title}
                  </span>
                </AccordionHeader>
                <AccordionPanel>
                  <p>{course.description}</p>
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
            <div>
              {/* <ul className='p-8 flex flex-col gap-4'>
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
              <ul className='flex flex-col gap-4 mt-8'>
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
            </div>
          </div>
          <div className='bg-[#EBEBEB] h-[92px] px-4 py-8 flex items-center gap-11'>
            <div>
              <p className='font-semibold text-[17px] leading-[22px]'>
                Reproduzindo 1 de 5
              </p>
              <p className='text-[12px] leading-4 text-[#616161]'>
                Próximo: Entendendo as variáveis macro
              </p>
            </div>
            <div className='flex gap-5'>
              <img src={next} alt='next' />
              <img src={upArrow} alt='view-all' />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
