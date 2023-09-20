import { convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';

import { Box, Heading, Image, Text } from '@chakra-ui/react';

export default function PostCard({ post }) {
  const contentRaw = JSON.parse(post.postContent);
  const contentState = convertFromRaw(contentRaw);
  const postDescription = contentState.getPlainText();

  return (
    <Link
      to={`/newsletter/post/${post.id}`}
      className='w-full h-32 shadow-md p-3 flex items-center gap-3 rounded-lg bg-white'
    >
      <Image
        src={post.thumb}
        alt='thumbnail'
        h={'104px'}
        className='rounded-sm object-cover max-w-[120px] min-w-[120px]'
      />
      <Box className='flex flex-col justify-start min-h-full overflow-hidden'>
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
        </Box>
      </Box>
    </Link>
  );
}
