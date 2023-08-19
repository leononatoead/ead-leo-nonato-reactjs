import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetchDocument from '../../hooks/useFetchDocument';
import useFetchDocuments from '../../hooks/useFetchDocuments';

import AddVideoModal from '../../components/AddVideoModal';

export default function CourseDetails() {
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const { id } = useParams();

  const {
    document: course,
    loadDocument,
    loading
  } = useFetchDocument('courses');

  const {
    documents: videos,
    loadDocuments: loadVideos,
    loading: loadingVideos
  } = useFetchDocuments(`courses/${id}/videos/`);

  useEffect(() => {
    loadDocument(id);
    loadVideos();
  }, []);

  return (
    <main className='mainLayout'>
      <h1 className='text-3xl text-sky-400 font-bold uppercase mb-2'>
        {course?.name}
      </h1>
      <div className='flex justify-start gap-20 items-start mt-8'>
        <div>
          <p className='mb-2'>
            <span className='font-bold'>Autor:</span> {course?.author}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Descrição:</span> {course?.description}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Gratuito:</span>
            {course?.isFree ? ' Sim' : ' Não'}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Necessita de cadastro:</span>
            {course?.isFree ? ' Sim' : ' Não'}
          </p>
        </div>
        <img src={course?.imagePath} alt='banner' className='max-h-[200px]' />
      </div>

      <h1 className='text-3xl text-sky-400 font-bold uppercase mb-2'>AULAS</h1>
      <div className='w-full flex justify-end'>
        <AddVideoModal
          id={id}
          openVideoModal={openVideoModal}
          setOpenVideoModal={setOpenVideoModal}
        />
      </div>
      <ul className='flex flex-col gap-4'>
        {videos?.map((video) => (
          <li key={video.id}>
            <span className='text-xl font-bold'>{video.title}</span>
            {/* <video controls controlsList='nodownload'>
              <source src={video.videoPath} type='video/mp4' />
            </video> */}
          </li>
        ))}
      </ul>
    </main>
  );
}
