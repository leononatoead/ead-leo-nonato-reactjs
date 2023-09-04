import { Link } from 'react-router-dom';

import { Box, Image, Text } from '@chakra-ui/react';

export default function Banner({ post }) {
  return (
    <Box className='w-[325px] h-[206px] relative rounded-[20px] overflow-hidden'>
      <Image src={post.image} alt='banner' className='w-full h-[206px]' />
      <Box className='absolute bottom-3 left-3 text-white text-base leading-5 px-4'>
        <Text className='!font-poppins !font-semibold !text-[22px] !leading-[26px] w-[126px] h-[130px]'>
          {post.title}
        </Text>
        <Text className='!font-poppins !text-[13px] !font-medium !leading-[13px] !tracking-[0.5px]'>
          {post.description}
        </Text>
        <Link
          to='/'
          className='!font-poppins !text-[11px] !font-normal !leading-[11px] !tracking-[0.5px]'
        >
          Assistir agora
        </Link>
      </Box>
    </Box>
  );
}
