import { Link } from 'react-router-dom';

import AuthHeader from '../../../components/Auth/AuthHeader';

import { CheckmarkCircleRegular } from '@fluentui/react-icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default function ChangePasswordSuccess() {
  return (
    <Flex flexDirection={'column'} className='min-h-screen bg-gray-200'>
      <AuthHeader />

      <Box px={4} mt={1}>
        <CheckmarkCircleRegular className='text-[#89D185] mb-6' fontSize={80} />
        <Heading
          className='!font-bold !font-poppins !text-large !leading-6 text-primary-500'
          mb={2}
        >
          Senha alterada!
        </Heading>
        <Text className='!font-medium !text-base !text-black !leading-5' mb={6}>
          Agora você já pode retornar à plataforma e fazer o login com sua nova
          senha.
        </Text>
      </Box>
      <Flex
        flexDirection={'column'}
        className='!flex-grow justify-end'
        px={'10px'}
        pb={6}
        gap={4}
      >
        <Link
          to='/'
          className='w-full bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px] text-center'
        >
          Retornar à plataforma
        </Link>
      </Flex>
    </Flex>
  );
}
