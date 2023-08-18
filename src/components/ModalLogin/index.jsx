import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function ModalLogin() {
  // const [email, setEmail] = useState('yago.ramiresx@gmail.com');
  const [email, setEmail] = useState('gabriel.ssalvador97@gmail.com');
  const [password, setPassword] = useState('password');

  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
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

      <p>Esqueceu sua senha?</p>
    </form>
  );
}
