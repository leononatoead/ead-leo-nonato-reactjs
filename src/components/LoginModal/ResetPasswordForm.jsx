import useAuth from '../../hooks/useAuth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from './loginSchema';

import {
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
} from '@fluentui/react-components';

import Input from '../Input';
import ButtonSubmit from '../ButtonSubmit';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ResetPasswordForm({ show }) {
  const { resetPassword, loading } = useAuth();

  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetSchema),
  });

  const handleReset = (formData) => {
    resetPassword(formData.email, setSuccess);
  };

  const handleSendAgain = () => {
    setSuccess(false);
    setTimer(60);
  };

  useEffect(() => {
    if (success) {
      if (timer > 0) {
        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => {
          clearInterval(timerInterval);
        };
      }
    }
  }, [success]);

  if (!success) {
    return (
      <form id='resetForm' onSubmit={handleSubmit(handleReset)}>
        <DialogBody>
          <DialogTitle>
            <p className='w-full text-center text-[#003E92] poppins text-[18px] font-bold'>
              Esqueci minha senha
            </p>

            <p className='text-[14px] font-medium leading-5 text-center mt-4'>
              Digite o e-mail que você utiliza na plataforma e enviaremos um
              link para redefinir sua senha
            </p>
          </DialogTitle>
          <DialogContent className='flex flex-col gap-4 !mt-5 !mb-5'>
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
          </DialogContent>
          <DialogActions className='!flex !flex-col'>
            <ButtonSubmit
              form='resetForm'
              disabled={false}
              text={'Enviar'}
              loading={loading}
            />
            <button className='h-8 mt-2' onClick={() => show(false)}>
              Voltar
            </button>
          </DialogActions>
        </DialogBody>
      </form>
    );
  } else {
    return (
      <DialogBody>
        <DialogTitle>
          <p className='w-full text-center text-[#003E92] poppins text-[18px] font-bold'>
            E-mail enviado!
          </p>

          <p className='text-[14px] font-medium leading-5 text-center mt-4'>
            Verifique sua caixa de entrada no e-mail para redefinir sua senha
          </p>
        </DialogTitle>
        <DialogContent>
          <p className='text-[14px] font-medium leading-5 mt-5 mb-7'>
            Não recebeu?{' '}
            <button
              className='text-[#005FB8]'
              onClick={handleSendAgain}
              disabled={timer > 0}
            >
              {timer > 0 ? `Reenviar em ${timer}s` : 'Reenviar código'}
            </button>
          </p>
        </DialogContent>
        <DialogActions className='!flex !flex-col'>
          <button
            className='w-full disabled:bg-white/30 bg-[#005FB8] rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px]'
            onClick={() => show(false)}
          >
            OK
          </button>
        </DialogActions>
      </DialogBody>
    );
  }
}
