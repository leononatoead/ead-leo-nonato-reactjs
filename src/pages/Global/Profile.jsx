import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';

import background from '../../assets/auth-background.png';
import closeIcon from '../../assets/closeIcon.svg';
import pencil from '../../assets/pencil.svg';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  function formatarTelefone(num) {
    let phone = num.replace('+', '');

    if (phone.startsWith('55')) {
      phone = phone.substring(2);
    }

    if (phone.length === 11) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        3,
      )} ${phone.substring(3, 7)}-${phone.substring(7)}`;
    } else if (phone.length === 10) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        6,
      )}-${phone.substring(6)}`;
    } else {
      return phone;
    }
  }

  return (
    <main className='min-h-screen bg-[#efefef]'>
      <Navbar />
      <div>
        <img
          src={background}
          alt=''
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />

        <div className='flex justify-center -mt-12 mb-4'>
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt='avatar'
              className='w-[95px] h-[95px] rounded-full border-4 border-[#001A68]'
            />
          ) : (
            <div className='w-[95px] h-[95px] rounded-full flex justify-center items-center bg-[#001A68] '>
              <img src={closeIcon} alt='avatar' className='w-8 invert-[100%]' />
            </div>
          )}
        </div>

        <h2 className='poppins text-[18px] font-bold leading-6 w-full text-center mb-1'>
          {user.name}
        </h2>
        <span className='block w-full text-center mb-5'>Assinante</span>
      </div>

      <div className='flex flex-col gap-4 px-5'>
        <h2 className='font-semibold leading-6 poppins text-base'>
          Dados pessoais
        </h2>
        <div className='flex flex-col'>
          <span className='text-[14px] leading-6'>CPF</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none bg-white shadow-sm shadow-zinc-700/50`}
          >
            {user.cpf}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-[14px] leading-[20px]'>E-mail</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none bg-white shadow-sm shadow-zinc-700/50`}
          >
            {user.email}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-[14px] leading-[20px]'>Celular</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none bg-white shadow-sm shadow-zinc-700/50`}
          >
            {formatarTelefone(user?.phoneNumber)}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-[14px] leading-[20px]'>Senha</span>
          <span
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none bg-white shadow-sm shadow-zinc-700/50 relative`}
          >
            ********
            <button className='absolute w-[32px] h-[28px] top-0 right-0 rounded-sm outline-none'>
              <img src={pencil} alt='pencil' />
            </button>
          </span>
        </div>
      </div>
    </main>
  );
}
