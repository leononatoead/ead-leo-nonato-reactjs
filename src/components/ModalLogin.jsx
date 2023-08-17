import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/modules/auth/actions';

export default function ModalLogin() {
  const [email, setEmail] = useState('yago.ramiresx@gmail.com');
  const [password, setPassword] = useState('password');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicou');
    dispatch(loginUser(email, password));
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <input
        type='email'
        className='border-2 border-black'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        className='border-2 border-black'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>login</button>
    </form>
  );
}
