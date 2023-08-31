import { Link } from 'react-router-dom';

import logo from '../../../assets/auth-logo.svg';

import { CheckmarkCircleRegular } from '@fluentui/react-icons';

export default function ChangePasswordSuccess() {
  return (
    <main className='min-h-screen auth-background py-6 flex flex-col'>
      <div id='recaptcha-container'></div>

      <div className='w-full flex justify-center pt-4 pb-8'>
        <img src={logo} alt='logo' />
      </div>

      <div className='mt-6 mb-8 flex flex-col gap-2 px-4'>
        <CheckmarkCircleRegular className='text-[#89D185] mb-6' fontSize={80} />
        <h2 className='font-bold text-large leading-[24px] text-white poppins'>
          Senha alterada!
        </h2>
        <h3 className='font-medium text-base leading-[20px] text-white mb-6'>
          Agora você já pode retornar à plataforma e fazer o login com sua nova
          senha.
        </h3>
      </div>
      <div className='flex-1 flex flex-col justify-between px-4 '>
        <div></div>
        <div className='px-[10px] flex flex-col gap-4'>
          <Link
            to='/'
            className='w-full bg-primary-500 rounded-[4px] px-3 py-[5px] text-white text-base leading-[20px] text-center'
          >
            Retornar à plataforma
          </Link>
        </div>
      </div>
    </main>
  );
}
