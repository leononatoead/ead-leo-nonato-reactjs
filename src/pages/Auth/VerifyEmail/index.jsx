import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/useAuth';

import { Link } from 'react-router-dom';
import AuthHeader from '../../../components/Auth/AuthHeader';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default function VerifyEmail() {
  const [timer, setTimer] = useState(60);

  const user = useSelector((state) => state.auth.user);

  const { verifyEmail } = useAuth();

  const handleVerify = () => {
    verifyEmail();
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timer]);

  return (
    <Flex flexDirection={'column'} className='min-h-screen bg-gray-200'>
      <AuthHeader step={3} />

      <Box className='mt-6 mb-8 flex flex-col gap-2 px-4'>
        <Heading className='!font-bold !font-poppins !text-large !leading-6 text-primary-500'>
          Verifique seu e-mail
        </Heading>
        <Text className='!font-medium !text-base !text-black !leading-5'>
          Clique no link enviado para seu e-mail de cadastro {user?.email}
        </Text>
        <Text className='!text-base text-black !font-medium !leading-5 mt-4'>
          Não recebeu?{' '}
          <button
            className='text-primary-400/80'
            onClick={handleVerify}
            disabled={timer > 0}
          >
            {timer > 0 ? `Reenviar em ${timer}s` : 'Reenviar código'}
          </button>
        </Text>
      </Box>

      <Box className='flex items-end !flex-1' px={'10px'} py={6}>
        <Link
          to='/verify-success'
          className='w-full bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px] text-center'
        >
          Continuar
        </Link>
      </Box>
    </Flex>
  );
}
