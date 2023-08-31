import { useState } from 'react';

import useAuth from '../../../hooks/useAuth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeProfileImageSchema } from './changeProfileImageSchema';

import {
  DialogActions,
  DialogBody,
  DialogContent,
} from '@fluentui/react-components';
import { CheckmarkCircleRegular } from '@fluentui/react-icons';

import Modal from '../Modal';
import Input from '../Input';
import ButtonSubmit from '../ButtonSubmit';

export default function ChangeProfileImage({ openModal, setOpenModal }) {
  const { changeImage, loading } = useAuth();

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changeProfileImageSchema),
  });

  const handleChange = (formData) => {
    changeImage(formData.url, setSuccess);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
    reset({ url: '' });
  };

  return (
    <Modal
      title={success ? '' : 'Alterar Imagem'}
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
          <p className='w-full text-center text-[#003E92] poppins text-large font-bold leading-6 mb-12'>
            Imagem de perfil alterada!
          </p>
          <DialogActions>
            <button
              className='w-full disabled:bg-white/30 bg-primary-500 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px]'
              onClick={handleCloseModal}
            >
              Voltar
            </button>
          </DialogActions>
        </div>
      ) : (
        <form id='changeProfileImageForm' onSubmit={handleSubmit(handleChange)}>
          <DialogBody>
            <DialogContent className='flex flex-col gap-4 '>
              <Input
                theme={'light'}
                type={'text'}
                label={'URL'}
                placeholder={'https://exemplo.com.br/'}
                register={register}
                id={'url'}
                error={errors?.url?.message}
                watch={watch}
              />
            </DialogContent>
            <DialogActions>
              <ButtonSubmit
                form='changeProfileImageForm'
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
