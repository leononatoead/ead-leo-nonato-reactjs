import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './registerSchema';

import useAuth from '../../hooks/useAuth';

export default function Register() {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(RegisterSchema)
  });

  const handleRegister = (formData) => {
    const data = {
      name: `${formData.firstName.trim()} ${formData.lastName}`,
      phone: `+55${formData.phone}`,
      email: formData.email,
      password: formData.password
    };

    registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className='flex flex-col mx-auto w-[90%] p-4 gap-4'
    >
      <input
        type='text'
        placeholder='Nome'
        {...register('firstName')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.firstName && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.firstName.message}
        </span>
      )}
      <input
        type='text'
        placeholder='Sobrenome'
        {...register('lastName')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.lastName && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.lastName.message}
        </span>
      )}
      <input
        type='text'
        placeholder='Telefone'
        {...register('phone')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.phone && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.phone.message}
        </span>
      )}
      <input
        type='email'
        placeholder='E-mail'
        {...register('email')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.email && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.email.message}
        </span>
      )}
      <input
        type='password'
        placeholder='Senha'
        {...register('password')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.password && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.password.message}
        </span>
      )}
      <input
        type='password'
        placeholder='Confirme sua senha'
        {...register('confirmPassword')}
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      {errors.confirmPassword && (
        <span className='text-xs text-red-400 mt-[-12px]'>
          {errors.confirmPassword.message}
        </span>
      )}

      <button type='submit'>Cadastrar</button>
    </form>
  );
}
