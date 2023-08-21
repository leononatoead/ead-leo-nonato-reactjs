import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/modules/courses/actions';

import AddVideoModal from '../../components/AddVideoModal';

import useVideo from '../../hooks/useVideo';
import useCourse from '../../hooks/useCourse';

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState();
  const [videoList, setVideoList] = useState();
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deleteCourse } = useCourse();
  const { deleteVideo } = useVideo();

  const handleDeleteCourse = (course) => {
    deleteCourse(course);
    navigate('/courses');
  };

  const handleDeleteVideo = (videoId, storageRef) => {
    deleteVideo(id, videoId, storageRef);
  };

  useEffect(() => {
    const course = courses.find((course) => course.id === id);

    if (course && !course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  useEffect(() => {
    const course = courses.find((course) => course.id === id);
    setCourse(course);

    if (course && course.videos) {
      setVideoList(course?.videos);
    }
  }, [courses, id]);

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

          <button
            onClick={() => handleDeleteCourse(course)}
            className='px-4 py-2 bg-red-500 rounded-md text-white font-bold'
          >
            Deletar
          </button>
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
      <ul className='flex flex-col gap-4 my-6'>
        {videoList?.map((video) => (
          <li key={video.id} className='flex justify-between items-center'>
            <span className='text-xl font-bold'>{video.title}</span>
            <button
              onClick={() => handleDeleteVideo(video.id, video.storageRef)}
              className='px-4 py-2 bg-red-500 rounded-md text-white font-bold'
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
