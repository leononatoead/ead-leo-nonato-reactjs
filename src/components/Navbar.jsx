import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/modules/auth/actions';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
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
