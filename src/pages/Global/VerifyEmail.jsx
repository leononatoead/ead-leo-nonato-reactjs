import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();

  return (
    <div>
      <button onClick={verifyEmail}>Reenviar Email</button>
    </div>
  );
}
