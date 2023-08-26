import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase/config';
import {
  RecaptchaVerifier,
  updatePhoneNumber,
  PhoneAuthProvider,
} from 'firebase/auth';

import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/auth-logo.svg';

export default function VerifyPhone() {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const navigate = useNavigate();

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignInSubmit();
          },
          'expired-callback': () => {},
        },
      );
    }
  };

  useEffect(() => {
    onCaptchaVerify();
  }, [phone]);

  const verifyPhone = async () => {
    setLoading(true);

    try {
      const formatPhone = `+${phone}`;
      const appVerifier = window.recaptchaVerifier;
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        formatPhone,
        appVerifier,
      );
      setVerificationId(id);
      setLoading(false);
      toast.success('Código enviado por SMS');
    } catch (error) {
      toast.error('Error sending verification code:', error);
      setLoading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    setLoading(true);
    try {
      const user = auth._currentUser;

      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );

      const res = await updatePhoneNumber(user, phoneCredential);
      console.log(res);
      navigate('/verify-email');
    } catch (error) {
      if (error.message === 'auth/account-exists-with-different-credential') {
        `
      toast.error('Telefone já cadastrado por outro usuário');
      `;
      } else {
        toast.error('Ocorreu um erro, tente novamente');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReSendCode = () => {
    setVerificationId('');
    setVerificationCode('');
  };

  useEffect(() => {
    let seconds = 60;

    if (verificationId) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          seconds--;
          setTimer(seconds);
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    }
  }, [verificationId]);

  return (
    <main className='min-h-[100vh] py-6 flex flex-col'>
      <div id='recaptcha-container'></div>

      <div className='w-full flex justify-center pt-4 pb-8'>
        <img src={logo} alt='logo' />
      </div>

      {verificationId ? (
        <div className='flex flex-col flex-1 '>
          <div className='flex justify-center gap-2 w-full p-4'>
            <span className='h-1 bg-[#005FB8] w-1/4' />
            <span className='h-1 bg-[#005FB8]  w-1/4' />
            <span className='h-1 bg-white w-1/4' />
            <span className='h-1 bg-white w-1/4' />
          </div>

          <div className='mt-6 mb-8 flex flex-col gap-2 px-4'>
            <h2 className='font-bold text-[18px] leading-[24px] text-white poppins'>
              Informe o código
            </h2>
            <h3 className='font-medium text-[14px] leading-[20px] text-white'>
              Digite o código de 6 dígitos enviado para seu telefone.
            </h3>
          </div>

          <div className='px-10 mb-6'>
            <OtpInput
              OTPLength={6}
              otpType='number'
              disabled={false}
              autoFocus
              className='flex justify-between gap-2 opt-container poppins'
              value={verificationCode}
              onChange={setVerificationCode}
            />
          </div>

          <div className='flex-1 flex flex-col justify-between px-4 '>
            <div>
              <p className='text-[14px] text-white'>
                Não recebeu?{' '}
                <button
                  className='text-[#60CDFF]'
                  onClick={handleReSendCode}
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Reenviar em ${timer}s` : 'Reenviar código'}
                </button>
              </p>
            </div>

            <div className='px-[10px]'>
              <button
                className='w-full bg-[#005FB8] disabled:bg-white/30 rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px]'
                onClick={handleUpdatePhoneNumber}
                disabled={verificationCode.length === 6 ? false : true}
              >
                {loading ? 'Carregando' : 'Validar'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col flex-1 '>
          <div className='flex justify-center gap-2 w-full p-4'>
            <span className='h-1 bg-[#005FB8] w-1/4' />
            <span className='h-1 bg-white w-1/4' />
            <span className='h-1 bg-white w-1/4' />
            <span className='h-1 bg-white w-1/4' />
          </div>
          <div className='mt-6 mb-8 flex flex-col gap-2 px-4'>
            <h2 className='font-bold text-[18px] leading-[24px] text-white poppins'>
              Verificação necessária
            </h2>
            <h3 className='font-medium text-[14px] leading-[20px] text-white'>
              Precisamos verificar seus dados pessoais. Informe seu celular para
              receber o código.
            </h3>
          </div>
          <div className='flex-1 flex flex-col justify-between px-4'>
            <div
              className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-[#60cdff] after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                phone ? 'after:w-full' : 'after:w-0'
              } hover:after:w-full animation`}
            >
              <PhoneInput
                country={'br'}
                value={phone}
                onChange={setPhone}
                className='[&>*:first-child]:hidden phoneInput'
              />
            </div>
            <div className='px-[10px]'>
              <button
                className='w-full bg-[#005FB8] disabled:bg-white/30 rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px]'
                onClick={verifyPhone}
                disabled={phone ? false : true}
              >
                {loading ? 'Carregando' : 'Enviar código SMS'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
