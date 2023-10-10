import { Link } from 'react-router-dom';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/bi';

export default function BannerCardAdmin({ cardData }) {
  return (
    <Link
      to={`/dashboard/home/banners/edit/${cardData.id}`}
      className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white'
    >
      <Image
        src={cardData.imageURL}
        alt='thumbnail'
        className='min-w-[120px] max-w-[120px] h-[104px] rounded-sm object-cover'
      />
      <Box className='flex flex-col justify-start min-h-full w-full overflow-hidden'>
        <Box className='flex-grow'>
          <Heading className='!text-base !font-poppins !font-semibold !leading-5 !text-primary-600 max-h-16 break-title -mt-1'>
            {cardData.title}
          </Heading>
          <Text className='text-gray-700 text-small break-title '>
            {cardData.subtitle}
          </Text>
        </Box>
        <Box className='w-full flex justify-end items-center'>
          <BiEdit size={18} className='text-primary-600' />
        </Box>
      </Box>
    </Link>
  );
}
