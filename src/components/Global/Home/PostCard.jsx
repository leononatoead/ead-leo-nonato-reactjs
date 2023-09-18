import { Link } from 'react-router-dom';

import { Box, Heading, Image, Text } from '@chakra-ui/react';

export default function PostCard({ post }) {
  return (
    <Link
      to={`/newsletter/post/${post.id}`}
      className='min-w-[170px] w-full flex items-start gap-3 h-24'
    >
      <Image
        src={post.thumb}
        className='w-[120px] h-24 object-cover rounded-xl'
      />
      <Box className='w-full flex flex-col justify-between h-full'>
        <Heading className='!w-full !text-base !font-poppins !font-bold !leading-[22px] !text-primary-600 max-h-16 break-title'>
          {post.title}
        </Heading>
        <Text className='text-small font-poppins text-gray-800'>
          {post.author}
        </Text>

        <Text className='text-small leading-4 text-gray-900'>
          {post.category}
        </Text>
      </Box>
    </Link>
  );
}
