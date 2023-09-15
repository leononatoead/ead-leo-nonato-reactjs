import { Link } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { MdAddCircleOutline } from 'react-icons/md';

export default function Posts() {
  return (
    <Box className='main-container'>
      <Box className='w-full flex justify-end'>
        <Link to='/dashboard/posts/new' className='add-btn'>
          <MdAddCircleOutline size={20} />
          <span className='font-bold'>Novo Post</span>
        </Link>
      </Box>
    </Box>
  );
}
