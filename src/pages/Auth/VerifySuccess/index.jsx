import { Link } from 'react-router-dom';

import AuthHeader from '../../../components/AuthHeader';

import { CheckmarkCircleRegular } from '@fluentui/react-icons';

export default function VerifyEmail() {
  return (
    <main className='min-h-screen auth-background py-6 flex flex-col'>
      <div id='recaptcha-container'></div>

      <AuthHeader step={4} />

      <div className='mt-6 mb-8 flex flex-col gap-2 px-4'>
        <CheckmarkCircleRegular className='text-[#89D185] mb-6' fontSize={80} />
        <h2 className='font-bold text-[18px] leading-[24px] text-white poppins'>
          Cadastro validado!
        </h2>
        <h3 className='font-medium text-[14px] leading-[20px] text-white mb-6'>
          Agora você já pode acessar a plataforma.
        </h3>
        <h3 className='font-medium text-[14px] leading-[20px] text-white'>
          Não esqueça de entrar no grupo de WhatsApp para não perder novidades e
          avisos importantes.
        </h3>
      </div>
      <div className='flex-1 flex flex-col justify-between px-4 '>
        <div></div>
        <div className='px-[10px] flex flex-col gap-4'>
          <button className='w-full bg-green-500 rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px] text-center border-[1px] border-[#89D185] '>
            Ir para o WhatsApp
          </button>
          <Link
            to='/'
            className='w-full bg-white rounded-[4px] px-3 py-[5px] text-[#005fb8] text-[14px] leading-[20px] text-center border-[1px] border-[#005fb8]'
          >
            Acessar plataforma
          </Link>
        </div>
      </div>
    </main>
  );
}
