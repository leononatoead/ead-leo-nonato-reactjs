import { Link } from 'react-router-dom';

import AuthHeader from '../../../components/Auth/AuthHeader';

import { CheckmarkCircleRegular } from '@fluentui/react-icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default function VerifySucess() {
  return (
    <Flex flexDirection={'column'} className='min-h-screen bg-gray-200'>
      <AuthHeader step={4} />

      <Box px={4} mt={1}>
        <CheckmarkCircleRegular className='text-green-200 mb-6' fontSize={80} />
        <Heading
          className='!font-bold !font-poppins !text-large !leading-6 text-primary-600'
          mb={2}
        >
          Cadastro validado!
        </Heading>
        <Text className='!font-medium !text-base !text-black !leading-5' mb={6}>
          Agora você já pode acessar a plataforma.
        </Text>
        <Text className='!font-medium !text-base !text-black !leading-5'>
          Não esqueça de entrar no grupo de WhatsApp para não perder novidades e
          avisos importantes.
        </Text>
      </Box>
      <Flex
        flexDirection={'column'}
        className='!flex-grow justify-end'
        px={'10px'}
        pb={6}
        gap={4}
      >
        <button className='w-full bg-green-300 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px] text-center border-[1px] border-green-300 '>
          Ir para o WhatsApp
        </button>
        <Link
          to='/'
          className='w-full bg-white rounded-[4px] px-3 py-[5px] text-primary-400 text-base leading-[20px] text-center border-[1px] border-primary-400'
        >
          Acessar plataforma
        </Link>
      </Flex>
    </Flex>
  );
}
