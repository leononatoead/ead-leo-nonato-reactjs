import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import VideoCardAdmin from '../../../components/Admin/VideoCardAdmin';
import { Box } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);

  return (
    <Box className='main-container'>
      <Box className='w-full flex justify-end'>
        <Link to='/dashboard/courses/new' className='add-btn'>
          <MdAddCircleOutline size={20} />{' '}
          <span className='font-bold'> Novo curso</span>
        </Link>
      </Box>

      {courses && (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
          {courses?.map((course) => (
            <VideoCardAdmin cardData={course} key={course.id} />
          ))}
        </ul>
      )}
    </Box>
  );
}
