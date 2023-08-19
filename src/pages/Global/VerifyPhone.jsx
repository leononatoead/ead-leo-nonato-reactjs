import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import {
  RecaptchaVerifier,
  updatePhoneNumber,
  PhoneAuthProvider
} from 'firebase/auth';

import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function VerifyPhone() {
  const [loading, setLoading] = useState(false);

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
          'expired-callback': () => {}
        }
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
        appVerifier
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
        verificationCode
      );

      await updatePhoneNumber(user, phoneCredential);

      window.location.reload();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='bg-sky-500 min-h-[calc(100vh-20px)] flex justify-center items-center'>
      <div>
        <div id='recaptcha-container'></div>

        <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
          {verificationId ? (
            <>
              <label
                htmlFor='otp'
                className='font-bold text-xl text-white text-center'
              >
                Digite seu código
              </label>

              <OtpInput
                OTPLength={6}
                otpType='number'
                disabled={false}
                autoFocus
                className='opt-container'
                value={verificationCode}
                onChange={setVerificationCode}
              ></OtpInput>

              <button
                className='bg-sky-600 w-full gap-1 flex items-center justify-center py-2.5 font-medium text-white rounded-sm hover:bg-sky-700'
                onClick={handleUpdatePhoneNumber}
              >
                {loading ? 'Carregando' : 'Verificar'}
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor='ph'
                className='font-bold text-xl text-white text-center'
              >
                Verify your phone number
              </label>

              <PhoneInput country={'br'} value={phone} onChange={setPhone} />
              <button
                className='bg-sky-600 w-full gap-1 flex items-center justify-center py-2.5 font-medium text-white rounded-sm hover:bg-sky-700'
                onClick={verifyPhone}
              >
                {loading ? 'Carregando' : 'Enviar código SMS'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
