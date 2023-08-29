import { useState } from 'react';

import useAuth from '../../../hooks/useAuth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from './changePasswordSchema';

import {
  DialogActions,
  DialogBody,
  DialogContent,
} from '@fluentui/react-components';
import { CheckmarkCircleRegular } from '@fluentui/react-icons';

import Modal from '../Modal';
import Input from '../Input';
import ButtonSubmit from '../ButtonSubmit';

export default function ChangePassword({ openModal, setOpenModal }) {
  const { changePassword, loading } = useAuth();

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChange = (formData) => {
    changePassword(formData.newPassword, setSuccess);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
    reset({ newPassword: '', confirmNewPassword: '' });
  };

  return (
    <Modal
      title={success ? '' : 'Alterar Senha'}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handleCloseModal={handleCloseModal}
    >
      {success ? (
        <div className='w-full'>
          <div className='flex flex-col items-center justify-center'>
            <CheckmarkCircleRegular
              className='text-[#89D185] mb-6'
              fontSize={80}
            />
          </div>
          <p className='w-full text-center text-[#003E92] poppins text-[18px] font-bold leading-6 mb-2'>
            Senha alterada!
          </p>
          <p className='text-[14px] font-medium leading-5 mb-8'>
            No seu próximo acesso, utilize a nova senha.
          </p>
          <DialogActions>
            <button
              className='w-full disabled:bg-white/30 bg-[#005FB8] rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px]'
              onClick={handleCloseModal}
            >
              Voltar
            </button>
          </DialogActions>
        </div>
      ) : (
        <form id='changePasswordForm' onSubmit={handleSubmit(handleChange)}>
          <DialogBody>
            <DialogContent className='flex flex-col gap-4 '>
              <Input
                theme={'light'}
                type={'password'}
                label={'Nova senha'}
                placeholder={'********'}
                register={register}
                id={'newPassword'}
                error={errors?.newPassword?.message}
                watch={watch}
              />
              <p className='text-xs -mt-4 text-zinc-500'>
                A senha deve ter pelo menos 8 caracteres e incluir um número ou
                caracter especial.
              </p>
              <Input
                theme={'light'}
                type={'password'}
                label={'Confirmar nova senha'}
                placeholder={'********'}
                register={register}
                id={'confirmNewPassword'}
                error={errors?.confirmNewPassword?.message}
                watch={watch}
              />
            </DialogContent>
            <DialogActions>
              <ButtonSubmit
                form='changePasswordForm'
                disabled={false}
                text={'Alterar'}
                loading={loading}
              />
            </DialogActions>
          </DialogBody>
        </form>
      )}
    </Modal>
  );
}
