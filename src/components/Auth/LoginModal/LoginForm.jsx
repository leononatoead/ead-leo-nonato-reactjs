import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from './loginSchema';
import { Link } from 'react-router-dom';

import Input from '../../Global/Input';
import ButtonSubmit from '../../Global/ButtonSubmit';
import {
  Box,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

export default function LoginForm({ show }) {
  const { loginUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = (formData) => {
    loginUser(formData.email, formData.password);
  };

  return (
    <>
      <ModalHeader p={0} mb={6}>
        <Heading className='w-full text-center text-primary-500 !text-large font-bold !font-poppins'>
          Acessar sua conta
        </Heading>
      </ModalHeader>
      <ModalBody p={0}>
        <form
          id='loginForm'
          onSubmit={handleSubmit(handleLogin)}
          className='flex flex-col gap-4 px-4'
        >
          <Input
            theme={'light'}
            type={'email'}
            label={'E-mail'}
            placeholder={'exemplo@exemplo.com'}
            register={register}
            id={'email'}
            error={errors?.email?.message}
            watch={watch}
          />
          <Input
            theme={'light'}
            type={'password'}
            label={'Senha'}
            placeholder={'********'}
            register={register}
            id={'password'}
            error={errors?.password?.message}
            watch={watch}
          />

          <Box className='-mt-4 mb-8'>
            <button
              type='button'
              className='text-primary-400 text-base leading-6 mb-7'
              onClick={() => {
                show(true);
              }}
            >
              Esqueci minha senha
            </button>

            <Text className='text-base font-medium leading-5'>
              Não tem uma conta?{' '}
              <Link to='/register' className='text-primary-400'>
                Cadastre-se agora
              </Link>
            </Text>
          </Box>
        </form>
        <ModalFooter p={0} px={'10px'}>
          <ButtonSubmit
            form='loginForm'
            disabled={false}
            text={'Acessar'}
            loading={loading}
          />
        </ModalFooter>
      </ModalBody>
    </>
  );
}
