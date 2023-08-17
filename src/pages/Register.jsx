import React, { useState } from 'react';
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [message, setMessage] = useState('');

  const sendVerificationCode = async () => {
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible'
      });

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setVerificationId(confirmationResult.verificationId);
      setMessage('Código de verificação enviado!');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao enviar código de verificação.');
    }
  };

  const verifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      setMessage('Telefone confirmado com sucesso!');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao verificar código.');
    }
  };

  return (
    <div>
      <h1>Confirmação de Telefone</h1>
      <input
        type='text'
        placeholder='Número de Telefone'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendVerificationCode}>Enviar Código</button>

      <input
        type='text'
        placeholder='Código de Verificação'
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={verifyCode}>Verificar Código</button>

      <p>{message}</p>
    </div>
  );
}
