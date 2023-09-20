import { Link } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { IoMdEye } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';

export default function PostCardAdmin({ post }) {
  const contentRaw = JSON.parse(post.postContent);
  const contentState = convertFromRaw(contentRaw);
  const postDescription = contentState.getPlainText();

  return (
    <Box className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white'>
      <Image
        src={post.thumb}
        alt='thumbnail'
        w={'120px'}
        h={'104px'}
        className='rounded-sm object-cover'
      />
      <Box className='flex flex-col justify-start min-h-full overflow-hidden w-full'>
        <Box className='flex-grow'>
          <Heading className='!text-base !font-poppins !font-semibold !leading-5 !text-primary-600 max-h-16 break-title -mt-1'>
            {post.title}
          </Heading>
          <Text className='text-gray-700 text-small break-title '>
            {postDescription}
          </Text>
        </Box>
        <Box className='w-full flex justify-between items-center'>
          <Text className='bg-gray-200 text-base rounded-xl px-3 py-[2px] font-medium'>
            {post.category}
          </Text>
          <Box className='flex justify-end items-center gap-2 flex-1'>
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
