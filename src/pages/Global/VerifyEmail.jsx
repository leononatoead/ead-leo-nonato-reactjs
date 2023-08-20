import React from 'react';

import useAuth from '../../hooks/useAuth';
// import { useDispatch } from 'react-redux';
// import { verifyAuthentication } from '../../redux/modules/auth/actions';

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();

  // const dispatch = useDispatch();
  // const handleVerify = () => {
  //   dispatch(verifyAuthentication());
  // };

  return (
    <main className='mainLayout bg-sky-500 text-white flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold uppercase mb-20'>
        Verifique o seu email!
      </h1>

      <p className='font-medium text-2xl'>Não recebeu o e-mail?</p>
      <button
        onClick={verifyEmail}
        className='px-12 py-4 bg-white text-sky-500 rounded-sm my-4 font-bold'
      >
        Reenviar Email
      </button>

      <p className='font-medium text-2xl mt-4'>Já verificou?</p>
      <button
        onClick={handleVerify}
        className='px-6 py-4 bg-white text-sky-500 rounded-sm my-4 font-bold'
      >
        Acesse nossos cursos.
      </button>
    </main>
  );
}
