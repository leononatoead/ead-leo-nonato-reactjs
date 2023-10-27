import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ShareBtn from '../ShareBtn';
import PremiumCourse from '../PremiumCourse';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { BiCartAdd, BiShareAlt } from 'react-icons/bi';
import { IoMdEye } from 'react-icons/io';

export default function CourseCard({ course }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  const url = `${import.meta.env.VITE_VERCEL_APP_URL}/course/${course.id}`;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${course.id}`);
  };

  const handleShare = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleNavigate}
      className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white cursor-pointer'
    >
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
              <IoMdEye size={18} className='text-primary-600' />
            )}

            <Box onClick={handleShare}>
              <ShareBtn url={url} />
            </Box>
          </Box>
        </Box>
      </Box>

      <PremiumCourse
        open={openPremiumModal}
        close={setOpenPremiumModal}
        courseData={course}
        closeBtn={true}
      />
    </Box>
  );
}