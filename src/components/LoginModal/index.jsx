import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger
} from '@fluentui/react-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './loginSchema';

export default function LoginModal({ openLoginModal, setOpenLoginModal }) {
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LoginSchema)
  });

  const handleLogin = (formData) => {
    loginUser(formData.email, formData.password);
    setOpenLoginModal(false);
  };

  return (
    <Dialog modalType='modal' open={openLoginModal}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Entre para acessar o curso</DialogTitle>
          <DialogContent>
            <form className='formLayout' onSubmit={handleSubmit}>
              <label htmlFor='email'>E-mail</label>
              <input
                id='email'
                type='email'
                className='inputLayout'
                {...register('email')}
                placeholder='exemplo@mail.com'
              />
              <label htmlFor='password'>Senha</label>
              <input
                id='password'
                type='password'
                className='inputLayout'
                {...register('password')}
                placeholder='digite sua senha ..'
              />
              <p>Esqueceu sua senha?</p>
            </form>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance='secondary'
                onClick={() => setOpenLoginModal(false)}
              >
                Cancelar
              </Button>
            </DialogTrigger>

            <Button appearance='primary' onClick={handleSubmit(handleLogin)}>
              Confirmar
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
