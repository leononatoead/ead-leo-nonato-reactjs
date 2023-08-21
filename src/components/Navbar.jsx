import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/modules/auth/actions';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className='w-full p-4 bg-sky-500 text-white font-bold flex gap-4 items-center justify-center'>
      <Link to='/'> Página Inicial </Link>

      {!user && <Link to='/register'> Cadastro </Link>}

      {user && (
        <>
          {user.admin && (
            <>
              <Link to='/dashboard'> Dashboard </Link>
              <Link to='/courses'> Cursos </Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
}
