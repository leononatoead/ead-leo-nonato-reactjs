import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/modules/courses/actions';

import AddVideoModal from '../../components/Admin/AddVideoModal';

import useCourse from '../../hooks/useCourse';
import EditCourseModal from '../../components/Admin/EditCourseModal';
import VideoEditCard from '../../components/Admin/VideoEditCard';

export default function CourseDetails() {
  const { id } = useParams();

  const [openEditCourseModal, setOpenEditCourseModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((course) => course.id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deleteCourse } = useCourse();

  const handleDeleteCourse = (course) => {
    deleteCourse(course);
    navigate('/dashboard/courses');
  };

  useEffect(() => {
    if (course && !course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  return (
    <main className='mainLayout'>
      <img
        src={course?.imagePath}
        alt='banner'
        className='w-full rounded-md mb-4'
      />
      <h1 className='text-2xl leading-7 text-[#003E92] font-bold mb-2 w-full text-center'>
        {course?.name}
      </h1>
      <div className='flex justify-start gap-20 items-start mt-8'>
        <div className='w-full'>
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

          <div className='w-full flex  items-center justify-center gap-4'>
            <button
              onClick={() => setOpenEditCourseModal(true)}
              className='px-4 py-[5px] bg-primary-500 rounded-md text-white font-bold'
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteCourse(course)}
              className='px-4 py-[5px] bg-red-500 rounded-md text-white font-bold'
            >
              Deletar
            </button>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between mt-10'>
        <h1 className='text-xl text-[#003E92] font-bold uppercase mb-2'>
          AULAS
        </h1>
        <button
          onClick={() => {
            setOpenVideoModal(true);
          }}
        >
          Adicionar aula
        </button>
      </div>

      {course.videos && (
        <ul className='flex flex-col'>
          {course.videos.map((section) => (
            <li key={section.section}>
              <h2>{section.section}</h2>

              <ul>
                {section.videos.map((video) => (
                  <VideoEditCard id={course.id} key={video.id} video={video} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <AddVideoModal
        id={id}
        openVideoModal={openVideoModal}
        setOpenVideoModal={setOpenVideoModal}
      />
      <EditCourseModal
        course={course}
        openEditModal={openEditCourseModal}
        setOpenEditModal={setOpenEditCourseModal}
      />
    </main>
  );
}
