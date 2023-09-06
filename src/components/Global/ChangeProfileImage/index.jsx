import { useState } from 'react';

import useAuth from '../../../hooks/useAuth';

import ModalComponent from '../ModalComponent';
import ButtonSubmit from '../ButtonSubmit';

import { ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

export default function ChangeProfileImage({ openModal, setOpenModal, user }) {
  const { changeImage, loading } = useAuth();

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    changeImage(image, setSuccess, user);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
  };

  return (
    <ModalComponent
      title={success ? '' : 'Alterar Imagem'}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handleCloseModal={handleCloseModal}
    >
      {success ? (
        <>
          <ModalBody p={0} mb={8} className='flex flex-col items-center'>
            <IoIosCheckmarkCircleOutline
              className='text-green-200 mb-6'
              size={80}
            />
            <Text className='w-full text-center text-primary-400 poppins text-large font-bold leading-6 '>
              Imagem de perfil alterada!
            </Text>
          </ModalBody>
          <ModalFooter p={0} className='flex flex-col' px={'10px'}>
            <button
              className='w-full disabled:bg-gray-900/30 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
              onClick={handleCloseModal}
            >
              Voltar
            </button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalBody p={0} mb={9}>
            <form
              id='changeProfileImageForm'
              onSubmit={handleChange}
              className='px-4'
            >
              <label
                htmlFor={'videoFile'}
                className='text-base leading-5 mb-[3px] block'
              >
                Selecionar imagem
              </label>

              <input
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
                className='w-full outline-none text-base'
              />
            </form>
          </ModalBody>
          <ModalFooter p={0} className='flex flex-col' px={'10px'}>
            <ButtonSubmit
              form='changeProfileImageForm'
              disabled={false}
              text={'Alterar'}
              loading={loading}
            />
          </ModalFooter>
        </>
      )}
    </ModalComponent>
  );
}
