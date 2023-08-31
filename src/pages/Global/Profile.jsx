import { useState } from 'react';
import { useSelector } from 'react-redux';

import useFormatPhone from '../../hooks/useFormatPhone';

import { Avatar } from '@fluentui/react-components';

import Navbar from '../../components/Global/Navbar';
import ChangePassword from '../../components/Global/ChangePassword';
import ChangeProfileImage from '../../components/Global/ChangeProfileImage';

import background from '../../assets/auth-background.png';
import edit from '../../assets/edit.svg';
import pencil from '../../assets/pencil.svg';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [openEditPhotoModal, setOpenEditPhotoModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);

  const { formatPhone } = useFormatPhone();

  return (
    <main className='min-h-screen bg-[#efefef]'>
      <Navbar title={'Perfil'} />
      <div>
        <img
          src={background}
          alt='background'
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />

        <div className=' flex justify-center -mt-12 mb-4'>
          <div className='relative'>
            {user?.photoURL ? (
              <Avatar
                name={user?.name}
                size={96}
                className='border-4 border-[#001A68]'
                image={{
                  src: user?.photoURL,
                }}
                // image={{
                //   src: 'https://avatars.githubusercontent.com/u/77733200?v=4',
                // }}
              />
            ) : (
              <Avatar name={user?.name} size={96} color='blue' />
            )}

            <button
              className='absolute bg-white rounded-full w-[20px] h-[20px] top-16 right-0 shadow-md shadow-black/40 flex justify-center items-center'
              onClick={() => setOpenEditPhotoModal(true)}
            >
              <img src={edit} alt='pencil' />
            </button>
          </div>
        </div>

        <h2 className='poppins text-large font-bold leading-6 w-full text-center mb-1'>
          {user.name}
        </h2>
        <span className='block w-full text-center mb-5'>Assinante</span>
      </div>

      <div className='flex flex-col gap-4 px-5'>
        <h2 className='font-semibold leading-6 poppins text-base'>
          Dados pessoais
        </h2>
        <div className='flex flex-col'>
          <span className='text-base leading-6'>CPF</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-base outline-none bg-white shadow-sm shadow-zinc-700/50 text-zinc-400`}
          >
            {user.cpf}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-base leading-[20px]'>E-mail</span>
          <span
            className={`w-full rounded-[4px] px-3 py-[5px] leading-[20px] text-base outline-none bg-white shadow-sm shadow-zinc-700/50 text-zinc-400`}
          >
            {user.email}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-base leading-[20px]'>Celular</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-base outline-none bg-white shadow-sm shadow-zinc-700/50 text-zinc-400`}
          >
            {formatPhone(user?.phoneNumber)}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-base leading-[20px]'>Senha</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-base outline-none bg-white shadow-sm shadow-zinc-700/50 relative`}
          >
            ********
            <button
              className='absolute w-[32px] h-[28px] top-0 right-0 rounded-sm outline-none'
              onClick={() => setOpenEditPasswordModal(true)}
            >
              <img src={pencil} alt='pencil' />
            </button>
          </span>
        </div>
      </div>

      <ChangeProfileImage
        openModal={openEditPhotoModal}
        setOpenModal={setOpenEditPhotoModal}
      />

      <ChangePassword
        openModal={openEditPasswordModal}
        setOpenModal={setOpenEditPasswordModal}
      />
    </main>
  );
}
