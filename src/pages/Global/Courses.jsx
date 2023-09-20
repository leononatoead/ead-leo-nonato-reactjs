import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Global/Navbar';
import CourseCard from '../../components/Global/Courses/CourseCard';
import SearchBar from '../../components/Global/SearchBar';
import { Box } from '@chakra-ui/react';

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);

  const { id } = useParams();

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title={id === 'premium' ? 'Cursos Pagos' : 'Cursos Gratuitos'} />
      <SearchBar type='course' />

      {courses && (
        <ul className='flex flex-col gap-4 px-4 py-6'>
          {courses.map(
            (course) =>
              course.isPremium &&
              id === 'premium' && (
                <CourseCard course={course} key={course.id} />
              ),
          )}

          {courses.map(
            (course) =>
              !course.isPremium &&
              id === 'free' && <CourseCard course={course} key={course.id} />,
          )}
        </ul>
      )}
    </Box>
  );
}
