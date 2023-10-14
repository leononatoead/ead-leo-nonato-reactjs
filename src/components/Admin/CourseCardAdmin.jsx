import { Link, useNavigate } from 'react-router-dom';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { IoMdEye } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';

export default function CourseCardAdmin({ cardData }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/courses/${cardData.id}`);
  };

  const handleView = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleEdit}
      className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white cursor-pointer'
    >
      <Image
        src={cardData.imagePath}
        alt='thumbnail'
        className='min-w-[120px] max-w-[120px] h-[104px] rounded-sm object-cover'
      />
      <Box className='flex flex-col justify-start min-h-full w-full overflow-hidden'>
        <Box className='flex-grow'>
          <Heading className='!text-base !font-poppins !font-semibold !leading-5 !text-primary-600 max-h-16 break-title -mt-1'>
            {cardData.name}
          </Heading>
          <Text className='text-gray-700 text-small break-title '>
            {cardData.description}
          </Text>
        </Box>
        <Box className='w-full flex justify-between items-center'>
          <Box className='flex justify-end items-center gap-2 flex-1'>
            <Box onClick={handleView}>
              <Link to={`/course/${cardData.id}`}>
                <IoMdEye size={18} className='text-primary-600' />
              </Link>
            </Box>
            <Link to={`/dashboard/courses/${cardData.id}`}>
              <BiEdit size={18} className='text-primary-600' />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
