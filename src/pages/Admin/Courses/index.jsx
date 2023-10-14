import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CourseCardAdmin from '../../../components/Admin/CourseCardAdmin';
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
        <ul className='flex flex-col gap-4 pt-6 flex-grow'>
          {courses?.map((course) => (
            <CourseCardAdmin cardData={course} key={course.id} />
          ))}
        </ul>
      )}
    </Box>
  );
}
