import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/modules/courses/actions';

import AddVideoModal from '../../components/AddVideoModal';

import useCourse from '../../hooks/useCourse';
import EditCourseModal from '../../components/EditCourseModal';
import VideoEditCard from '../../components/VideoEditCard';

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState();
  const [videoList, setVideoList] = useState();
  const [openEditCourseModal, setOpenEditCourseModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deleteCourse } = useCourse();

  const handleDeleteCourse = (course) => {
    deleteCourse(course);
    navigate('/dashboard/courses');
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

          <div className='w-full flex justify-between gap-4'>
            <EditCourseModal
              course={course}
              openEditModal={openEditCourseModal}
              setOpenEditModal={setOpenEditCourseModal}
            />
            <button
              onClick={() => handleDeleteCourse(course)}
              className='px-4 py-2 bg-red-500 rounded-md text-white font-bold'
            >
              Deletar
            </button>
          </div>
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
          <VideoEditCard id={id} video={video} key={video.id} />
        ))}
      </ul>
    </main>
  );
}
