import {
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
} from '@fluentui/react-components';
import React from 'react';
import Input from '../Input';
import ButtonSubmit from '../ButtonSubmit';
import useAuth from '../../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './loginSchema';
import { Link } from 'react-router-dom';

export default function LoginForm() {
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
    <form id='loginForm' onSubmit={handleSubmit(handleLogin)}>
      <DialogBody>
        <DialogTitle>
          <p className='w-full text-center text-[#003E92] poppins text-[18px] font-bold'>
            Acessar sua conta
          </p>
        </DialogTitle>
        <DialogContent className='flex flex-col gap-4 !mt-5'>
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
            placeholder={'***********'}
            register={register}
            id={'password'}
            error={errors?.password?.message}
            watch={watch}
          />

          <div className='-mt-4 mb-8'>
            <button className='text-[#005FB8] text-[14px]  leading-[24px] mb-7'>
              Esqueci minha senha
            </button>

            <p className='text-[14px] font-medium leading-[20px]'>
              Não tem uma conta?{' '}
              <Link to='/register' className='text-[#005FB8]'>
                Cadastre-se agora
              </Link>
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonSubmit
            form='loginForm'
            disabled={false}
            text={'Acessar'}
            loading={loading}
          />
        </DialogActions>
      </DialogBody>
    </form>
  );
}
