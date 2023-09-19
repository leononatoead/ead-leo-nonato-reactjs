import { useSelector } from 'react-redux';

import Navbar from '../../components/Global/Navbar';

import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import VideoCard from '../../components/Global/VideoCard';

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);

  const { id } = useParams();

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title={id === 'premium' ? 'Cursos Pagos' : 'Cursos Gratuitos'} />

      {courses && (
        <ul className='flex flex-col gap-4 px-4 py-6'>
          {courses.map(
            (course) =>
              course.isPremium &&
              id === 'premium' && (
                <VideoCard cardData={course} key={course.id} />
              ),
          )}

          {courses.map(
            (course) =>
              !course.isPremium &&
              id === 'free' && <VideoCard cardData={course} key={course.id} />,
          )}
        </ul>
      )}
    </Box>
  );
}
