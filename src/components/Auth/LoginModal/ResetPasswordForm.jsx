import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from './loginSchema';

import useAuth from '../../../hooks/useAuth';

import Input from '../../Global/Input';
import ButtonSubmit from '../../Global/ButtonSubmit';

import {
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

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

  return (
    <>
      {!success ? (
        <>
          <ModalHeader p={0} mb={6}>
            <Heading className='w-full text-center text-primary-500 !text-large font-bold !font-poppins'>
              Esqueci minha senha
            </Heading>

            <Text className='text-base font-medium leading-5 text-center mt-4'>
              Digite o e-mail que você utiliza na plataforma e enviaremos um
              link para redefinir sua senha
            </Text>
          </ModalHeader>
          <ModalBody p={0}>
            <form
              id='resetForm'
              onSubmit={handleSubmit(handleReset)}
              className='p-4'
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
            </form>
          </ModalBody>
          <ModalFooter p={0} className='flex flex-col' px={'10px'}>
            <ButtonSubmit
              form='resetForm'
              disabled={false}
              text={'Enviar'}
              loading={loading}
            />
            <button className='h-8 mt-2' onClick={() => show(false)}>
              Voltar
            </button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalHeader p={0} mb={6} px={4}>
            <Heading className='w-full text-center text-primary-500 !text-large font-bold !font-poppins'>
              E-mail enviado!
            </Heading>

            <Text className='text-base font-medium leading-5 text-center mt-4'>
              Verifique sua caixa de entrada no e-mail para redefinir sua senha
            </Text>
          </ModalHeader>

          <ModalBody p={0} px={4} mb={8}>
            <Text className='text-base font-medium leading-5'>
              Não recebeu?{' '}
              <button
                className='text-primary-400'
                onClick={handleSendAgain}
                disabled={timer > 0}
              >
                {timer > 0 ? `Reenviar em ${timer}s` : 'Reenviar código'}
              </button>
            </Text>
          </ModalBody>
          <ModalFooter p={0} px={'10px'}>
            <button
              className='w-full disabled:bg-white/30 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
              onClick={() => show(false)}
            >
              OK
            </button>
          </ModalFooter>
        </>
      )}
    </>
  );
}
