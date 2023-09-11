import React from 'react';
import Navbar from '../components/Global/Navbar';
import { Box } from '@chakra-ui/react';

export default function Loading() {
  return (
    <main className='h-screen bg-gray-200 overflow-hidden'>
      <Navbar />
      <Box px={4} py={6}>
        <Box className='h-40 bg-gray-100 w-full rounded-md' mb={4}></Box>
        <Box className='h-4 bg-gray-100 w-[140px] rounded-md'></Box>
        <Box className='flex justify-center items-center gap-4' mt={2}>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
        </Box>
        <Box className='h-4 bg-gray-100 w-[140px] rounded-md' mt={10}></Box>
        <Box className='flex justify-center items-center gap-4' mt={2}>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
        </Box>
        <Box className='h-4 bg-gray-100 w-[140px] rounded-md' mt={10}></Box>
        <Box className='flex justify-center items-center gap-4' mt={2}>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
          <Box className='h-24 bg-gray-100 w-[50%] rounded-md'></Box>
        </Box>
      </Box>
    </main>
  );
}
