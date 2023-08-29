import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './registerSchema';

import { cpf } from 'cpf-cnpj-validator';

import useAuth from '../../../hooks/useAuth';
import Input from '../../../components/Global/Input';

import ButtonSubmit from '../../../components/Global/ButtonSubmit';
import logo from '../../../assets/auth-logo.svg';

import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <main className='min-h-screen auth-background py-6'>
      <Link to='/' className='w-full flex justify-center pt-4 pb-8'>
        <img src={logo} alt='logo' />
      </Link>

      <div className='px-4'>
        <video
          src='https://www.youtube.com/watch?v=paNdkV9RcSs'
          autoPlay
          controls
          className='rounded-[4px] w-full h-56 border-b-gray-600 border-b-2'
        />
      </div>

      <div className='my-6 flex flex-col gap-2 px-4'>
        <h2 className='font-bold text-[18px] leading-[24px] text-white poppins'>
          Preparado para fazer um salário mínimo por dia?
        </h2>

        <h3 className='font-medium text-[14px] leading-[20px] text-white'>
          Cadastre para obter acesso aos conteúdos que mudarão sua vida.
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className='flex flex-col px-5 gap-6'
        id='registerForm'
      >
        <Input
          type={'text'}
          label={'Nome completo'}
          placeholder={'Digite aqui'}
          register={register}
          id={'name'}
          error={errors?.name?.message}
          watch={watch}
        />
        <Input
          type={'text'}
          label={'CPF'}
          placeholder={'Digite aqui'}
          register={register}
          id={'cpf'}
          error={errors?.cpf?.message || cpfError}
          watch={watch}
        />
        <Input
          type={'email'}
          label={'E-mail'}
          placeholder={'Digite aqui'}
          register={register}
          id={'email'}
          error={errors?.email?.message}
          watch={watch}
        />
        <Input
          type={'password'}
          label={'Senha'}
          placeholder={'Digite aqui'}
          register={register}
          id={'password'}
          error={errors?.password?.message}
          watch={watch}
        />
        <Input
          type={'password'}
          label={'Confirme sua senha'}
          placeholder={'Digite aqui'}
          register={register}
          id={'confirmPassword'}
          error={errors?.confirmPassword?.message}
          watch={watch}
        />
      </form>
      <div className='p-[10px]'>
        <ButtonSubmit
          form='registerForm'
          disabled={Object.keys(dirtyFields).length !== 5}
          text={'Cadastrar'}
        />
      </div>
    </main>
  );
}
