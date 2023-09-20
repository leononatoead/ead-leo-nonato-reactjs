import { useState } from 'react';
import { Link } from 'react-router-dom';

import PremiumCourse from '../PremiumCourse';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { BiCartAdd, BiShareAlt } from 'react-icons/bi';
import { IoMdEye } from 'react-icons/io';

export default function CourseCard({ course }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  return (
    <Box className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white'>
      <Image
        src={course.imagePath}
        alt='thumbnail'
        w={'120px'}
        h={'104px'}
        className='rounded-sm object-cover'
      />
      <Box className='flex flex-col justify-start min-h-full w-full overflow-hidden'>
        <Box className='flex-grow'>
          <Heading className='!text-base !font-poppins !font-semibold !leading-5 !text-primary-600 max-h-16 break-title -mt-1'>
            {course.name}
          </Heading>
          <Text className='text-gray-700 text-small break-title '>
            {course.description}
          </Text>
        </Box>
        <Box className='w-full flex justify-between items-center'>
          <Box className='flex justify-end items-center gap-2 flex-1'>
            {course.isPremium ? (
              <button onClick={() => setOpenPremiumModal(true)}>
                <BiCartAdd size={18} className='text-primary-600' />
              </button>
            ) : (
              <Link to={`/course/${course.id}`}>
                <IoMdEye size={18} className='text-primary-600' />
              </Link>
            )}
            <button>
              <BiShareAlt size={18} className='text-primary-600' />
            </button>
          </Box>
        </Box>
      </Box>

      <PremiumCourse
        open={openPremiumModal}
        close={setOpenPremiumModal}
        courseData={course}
      />
    </Box>
  );
}