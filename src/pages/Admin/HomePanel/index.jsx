import { Box, Link } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';

export default function HomePanel() {
  return (
    <Box className='main-container bg-gray-200'>
      <Box className='w-full flex justify-end text-white'>
        <Link to='/dashboard/forms/new' className='add-btn '>
          <MdAddCircleOutline size={20} />
          <span className='font-bold'>Novo banner</span>
        </Link>
      </Box>
    </Box>
  );
}
