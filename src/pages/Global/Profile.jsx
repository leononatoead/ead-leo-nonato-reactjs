import { useState } from 'react';
import { useSelector } from 'react-redux';

import useFormatPhone from '../../hooks/useFormatPhone';

import Navbar from '../../components/Global/Navbar';
import ChangePassword from '../../components/Global/ChangePassword';
import ChangeProfileImage from '../../components/Global/ChangeProfileImage';

import { Box, Image, Avatar, Heading, Flex, Text } from '@chakra-ui/react';

import background from '../../assets/auth-background.png';
import { BiPencil } from 'react-icons/bi';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [openEditPhotoModal, setOpenEditPhotoModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);

  const { formatPhone } = useFormatPhone();

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title={'Perfil'} />
      <Box>
        <Image
          src={background}
          alt='background'
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />

        <Box className='flex justify-center -mt-12 mb-4'>
          <Box className='relative'>
            <Avatar
              name={user?.name}
              src={user?.photoURL}
              size={'xl'}
              className='border-4 !border-primary-500 !bg-primary-500 !text-white'
            />

            <button
              className='absolute bg-white rounded-full w-[20px] h-[20px] top-16 right-0 shadow-md shadow-black/40 flex justify-center items-center'
              onClick={() => setOpenEditPhotoModal(true)}
            >
              <BiPencil />
            </button>
          </Box>
        </Box>

        <Heading className='!font-poppins !text-large !font-bold leading-6 w-full text-center mb-1'>
          {user.name}
        </Heading>
        <Text className='w-full text-center mb-5'>Assinante</Text>
      </Box>

      <Flex flexDirection='column' gap={4} px={5}>
        <Heading className='!font-semibold !leading-6 !font-poppins !text-normal'>
          Dados pessoais
        </Heading>
        <Flex flexDirection='column' gap={1}>
          <Text className='text-base leading-6'>CPF</Text>
          <Text
            className='w-full rounded-[4px]  leading-5 text-base outline-none bg-white shadow-sm  shadow-gray-900/50 text-gray-400'
            px={3}
            py={'5px'}
          >
            {user.cpf}
          </Text>
        </Flex>
        <Flex flexDirection='column' gap={1}>
          <Text className='text-base leading-5'>E-mail</Text>
          <Text
            className='w-full rounded-[4px]  leading-5 text-base outline-none bg-white shadow-sm  shadow-gray-900/50 text-gray-400'
            px={3}
            py={'5px'}
          >
            {user.email}
          </Text>
        </Flex>
        <Flex flexDirection='column' gap={1}>
          <Text className='text-base leading-5'>Celular</Text>
          <Text
            className='w-full rounded-[4px]  leading-5 text-base outline-none bg-white shadow-sm  shadow-gray-900/50 text-gray-400'
            px={3}
            py={'5px'}
          >
            {formatPhone(user?.phoneNumber)}
          </Text>
        </Flex>
        <Flex flexDirection='column' gap={1} className='relative'>
          <Text className='text-base leading-5'>Senha</Text>
          <Text
            className='w-full rounded-[4px]  leading-5 text-base outline-none bg-white shadow-sm  shadow-gray-900/50 text-gray-400'
            px={3}
            py={'5px'}
          >
            ********
            <button
              className='absolute w-[32px] h-[28px] top-6 right-0 rounded-sm outline-none'
              onClick={() => setOpenEditPasswordModal(true)}
            >
              <BiPencil className='text-gray-400' />
            </button>
          </Text>
        </Flex>
      </Flex>

      <ChangeProfileImage
        openModal={openEditPhotoModal}
        setOpenModal={setOpenEditPhotoModal}
        user={user}
      />

      <ChangePassword
        openModal={openEditPasswordModal}
        setOpenModal={setOpenEditPasswordModal}
      />
    </Box>
  );
}
