import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './registerSchema';

import useAuth from '../../../hooks/useAuth';

export default function Register() {
  const { registerUser } = useAuth();

  const navigate = useNavigate();

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
      email: formData.email,
      password: formData.password
    };

    registerUser(data);
    navigate('/');
  };

  return (
    <main className='mainLayout'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='formLayout max-w-[600px] mx-auto'
      >
        <input
          type='text'
          placeholder='Nome'
          {...register('firstName')}
          className='inputLayout'
        />
        {errors.firstName && (
          <span className='errorText'>{errors.firstName.message}</span>
        )}
        <input
          type='text'
          placeholder='Sobrenome'
          {...register('lastName')}
          className='inputLayout'
        />
        {errors.lastName && (
          <span className='errorText'>{errors.lastName.message}</span>
        )}

        <input
          type='email'
          placeholder='E-mail'
          {...register('email')}
          className='inputLayout'
        />
        {errors.email && (
          <span className='errorText'>{errors.email.message}</span>
        )}
        <input
          type='password'
          placeholder='Senha'
          {...register('password')}
          className='inputLayout'
        />
        {errors.password && (
          <span className='errorText'>{errors.password.message}</span>
        )}
        <input
          type='password'
          placeholder='Confirme sua senha'
          {...register('confirmPassword')}
          className='inputLayout'
        />
        {errors.confirmPassword && (
          <span className='errorText'>{errors.confirmPassword.message}</span>
        )}

        <button type='submit' className='formSubmitButton'>
          Cadastrar
        </button>
      </form>
    </main>
  );
}
