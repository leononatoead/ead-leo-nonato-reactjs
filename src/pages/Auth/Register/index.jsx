import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './registerSchema';

import { cpf } from 'cpf-cnpj-validator';

import useAuth from '../../../hooks/useAuth';
import Input from '../../../components/Global/Input';

import ButtonSubmit from '../../../components/Global/ButtonSubmit';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Heading, Image, Text } from '@chakra-ui/react';

import logo from '../../../assets/auth-logo-black.svg';
import background from '../../../assets/bg-light.png';

export default function Register() {
  const { registerUser } = useAuth();

  const [cpfError, setCpfError] = useState();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = (formData) => {
    const verifyCPF = cpf.isValid(formData.cpf);

    if (verifyCPF) {
      const data = {
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
      };
      registerUser(data);
      setCpfError('');
    } else {
      setCpfError('CPF Inválido');
    }
  };

  return (
    <Box
      w='100%'
      color='white'
      borderBottom={'1px'}
      borderBottomColor={'primary-600'}
      className='relative bg-gray-200'
    >
      <Box
        w='100%'
        h='160px'
        borderRadius={'0 0 16px 16px'}
        className='relative'
      >
        <Image src={background} alt='background' />
        <Link
          to='/'
          className='absolute top-8 w-full flex justify-center pt-4 pb-8'
        >
          <Image src={logo} alt='logo' />
        </Link>
      </Box>

      <Box marginTop={'-40px'} px={4} className='rounded-lg  overflow-hidden'>
        <video
          src='https://www.youtube.com/watch?v=paNdkV9RcSs'
          autoPlay
          controls
          className='rounded-lg w-full h-56 border-b-gray-900 border-b-2 overflow-hidden'
        />
      </Box>

      <Box px={4} mt={'24px'} mb={'16px'}>
        <Heading
          fontSize={'18px'}
          fontWeight={'bold'}
          lineHeight={'24px'}
          className='!font-poppins text-primary-500'
          mb='2px'
        >
          Preparado para fazer um salário mínimo por dia?
        </Heading>

        <Text
          fontSize={'14px'}
          fontWeight={'500'}
          lineHeight={'20px'}
          className='!font-inter text-primary-500'
        >
          Cadastre para obter acesso aos conteúdos que mudarão sua vida.
        </Text>
      </Box>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className='flex flex-col px-5 gap-4'
        id='registerForm'
      >
        <Input
          theme={'light'}
          type={'text'}
          label={'Nome completo'}
          placeholder={'Digite aqui'}
          register={register}
          id={'name'}
          error={errors?.name?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'CPF'}
          placeholder={'Digite aqui'}
          register={register}
          id={'cpf'}
          error={errors?.cpf?.message || cpfError}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'email'}
          label={'E-mail'}
          placeholder={'Digite aqui'}
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
        <Input
          theme={'light'}
          type={'password'}
          label={'Confirme sua senha'}
          placeholder={'********'}
          register={register}
          id={'confirmPassword'}
          error={errors?.confirmPassword?.message}
          watch={watch}
        />
      </form>
      <Box p={'10px'}>
        <ButtonSubmit
          theme={'light'}
          form='registerForm'
          disabled={Object.keys(dirtyFields).length !== 5}
          text={'Cadastrar'}
        />
      </Box>
    </Box>
  );
}
