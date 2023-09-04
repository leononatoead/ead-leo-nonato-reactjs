import { RiCloseFill } from 'react-icons/ri';
import logo from '../../assets/auth-logo-black.svg';

import {
  Modal,
  ModalContent,
  ModalOverlay,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';

export default function ModalComponent({
  openModal,
  handleCloseModal,
  title,
  children,
  header = null,
}) {
  return (
    <Modal isOpen={openModal} my={0}>
      <ModalOverlay />
      <ModalContent
        className='!absolute !bg-gray-200 !bottom-0 !m-0 !rounded-b-none !rounded-t-3xl'
        py={6}
      >
        {header ? (
          <Box className='relative flex justify-center w-full mb-11'>
            <Image src={logo} alt='logo' />
            <button
              onClick={handleCloseModal}
              className='border-none bg-transparent absolute right-4 outline-none'
            >
              <RiCloseFill alt='close' className='w-4' />
            </button>
          </Box>
        ) : (
          <Box className='relative flex justify-center w-full mb-7'>
            <Text className='w-full text-center text-primary-500 text-large font-bold'>
              {title}
            </Text>
            <button
              onClick={handleCloseModal}
              className='border-none bg-transparent absolute right-4 outline-none'
            >
              <RiCloseFill alt='close' className='w-4' />
            </button>
          </Box>
        )}
        <>{children}</>
      </ModalContent>
    </Modal>
  );
}
