import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/modules/courses/actions';
import useCourse from '../../hooks/useCourse';

import VideoEditCard from '../../components/Admin/VideoEditCard';

import { Box, Image, Heading, Text } from '@chakra-ui/react';

import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';

export default function CourseDetails() {
  const { id } = useParams();

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
    <Box className='min-h-screen pb-6'>
      <Image
        src={course?.imagePath}
        alt='banner'
        className='w-full rounded-b-2xl mb-4'
      />
      <Heading className='!px-4 !text-large !leading-7 !text-primary-500 !font-bold  !w-full !text-center !font-poppins'>
        {course?.name}
      </Heading>
      <Box className='flex justify-start gap-20 items-start p-4'>
        <Box className='w-full'>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Autor:</span>{' '}
            {course?.author}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Descrição:</span>{' '}
            {course?.description}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Gratuito:</span>
            {course?.isFree ? ' Sim' : ' Não'}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>
              Necessita de cadastro:
            </span>
            {course?.isFree ? ' Sim' : ' Não'}
          </Text>

          <Link
            to={'id'}
            className='flex justify-center items-center gap-3 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px]'
          >
            <BiEdit size={18} /> Editar
          </Link>
          {/* <button
              onClick={() => handleDeleteCourse(course)}
              className='px-4 py-[5px] bg-red-500 rounded-md text-white font-bold'
            >
              Deletar
            </button> */}
        </Box>
      </Box>

      <Box className='w-full flex justify-between mt-10 px-4'>
        <Heading className='!text-large !leading-7 !text-primary-500 !font-bold  !text-center !font-poppins'>
          Aulas
        </Heading>
        <Link
          to={'id'}
          className='flex justify-center items-center gap-3 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px]'
        >
          <MdAddCircleOutline size={18} /> Nova aula
        </Link>
      </Box>
      {/* TODO: AJUSTAR LISTA DE VIDEOS */}
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
    </Box>
  );
}
