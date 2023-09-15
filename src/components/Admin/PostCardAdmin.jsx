import { Box, Heading, Image, Text } from '@chakra-ui/react';

import { IoMdEye } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function PostCardAdmin({ post }) {
  return (
    <Box className='w-full h-32 shadow-md p-2 flex items-center gap-2 rounded-lg bg-white'>
      <Image
        src={post.thumb}
        alt='thumbnail'
        w={'128px'}
        h={'112px'}
        className='rounded-md object-cover'
      />
      <Box className='flex flex-col justify-start min-h-full overflow-hidden'>
        <Box className='flex-grow'>
          <Heading className='!text-base !font-poppins !font-semibold !leading-5 !text-primary-600'>
            {post.title}
          </Heading>
          <Text className='text-gray-700 text-small'>{post.author}</Text>
        </Box>
        <Box className='w-full flex justify-between items-center'>
          <Text className='bg-primary-500 text-white text-base font-medium rounded-sm px-1'>
            {post.category}
          </Text>
          <Box className=' flex items-center gap-2'>
            <Link to={`/newsletter/post/${post.id}`}>
              <IoMdEye size={18} className='text-primary-600' />
            </Link>
            <Link to={`/dashboard/posts/edit/${post.id}`}>
              <BiEdit size={18} className='text-primary-600' />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
