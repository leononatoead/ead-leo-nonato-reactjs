import { useSelector } from 'react-redux';

import VideoCardAdmin from '../../components/Admin/VideoCardAdmin';

import { Box } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);

  return (
    <Box className='min-h-[calc(100vh-40px)] px-4 py-6'>
      <Box className='w-full flex justify-end'>
        <Link
          to='/dashboard/courses/new'
          className='flex items-center gap-3 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
        >
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
