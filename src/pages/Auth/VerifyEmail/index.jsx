import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/useAuth';

import { Link } from 'react-router-dom';
import AuthHeader from '../../../components/AuthHeader';

export default function VerifyEmail() {
  const [timer, setTimer] = useState(60);

  const user = useSelector((state) => state.auth.user);

  const { verifyEmail } = useAuth();

  const handleVerify = () => {
    verifyEmail();
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timer]);

  return (
    <main className='min-h-screen auth-background py-6 flex flex-col'>
      <div id='recaptcha-container'></div>

      <AuthHeader step={3} />

      <div className='mt-6 mb-8 flex flex-col gap-2 px-4'>
        <h2 className='font-bold text-[18px] leading-[24px] text-white poppins'>
          Verifique seu e-mail
        </h2>
        <h3 className='font-medium text-[14px] leading-[20px] text-white'>
          Clique no link enviado para seu e-mail de cadastro {user?.email}
        </h3>
      </div>
      <div className='flex-1 flex flex-col justify-between px-4 '>
        <div>
          <p className='text-[14px] text-white'>
            Não recebeu?{' '}
            <button
              className='text-[#60CDFF]'
              onClick={handleVerify}
              disabled={timer > 0}
            >
              {timer > 0 ? `Reenviar em ${timer}s` : 'Reenviar código'}
            </button>
          </p>
        </div>

        <div className='px-[10px] flex'>
          <Link
            to='/verify-success'
            className='w-full bg-white/30 rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px] text-center'
          >
            Continuar
          </Link>
        </div>
      </div>
    </main>
  );
}
