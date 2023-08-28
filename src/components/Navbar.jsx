import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/modules/auth/actions';
import LoginModal from './LoginModal';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className='w-full p-4 bg-sky-500 text-white font-bold flex gap-4 items-center justify-center'>
      <Link to='/'> Página Inicial </Link>

      {!user && (
        <>
          <button onClick={() => setOpenLoginModal(true)}>Login</button>
          <Link to='/register'> Cadastro </Link>
        </>
      )}

      {user && (
        <>
          <Link to='/profile'> Perfil </Link>
          {user.admin && (
            <>
              <Link to='/dashboard'> Dashboard </Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </header>
  );
}
