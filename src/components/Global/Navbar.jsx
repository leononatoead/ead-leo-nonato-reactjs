import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/modules/auth/actions';
import LoginModal from '../../components/Auth/LoginModal';

import arrowLeft from '../../assets/left-arrow.svg';
import burger from '../../assets/burger.svg';
import {
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

export default function Navbar({ title }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className='w-full px-4 py-2 bg-white font-bold flex gap-4 items-center justify-center'>
      <Menu className='!h-[44px]'>
        <MenuTrigger disableButtonEnhancement>
          <div className='flex items-center justify-center w-full'>
            {path.pathname !== '/' && (
              <Link to='/'>
                <img src={arrowLeft} alt='back' />
              </Link>
            )}
            <span className='block poppins text-[17px] leading-[22px] flex-1 text-center font-normal'>
              {title}
            </span>
            <button className=''>
              <img src={burger} alt='menu' />
            </button>
          </div>
        </MenuTrigger>

        <MenuPopover className='!right-8 !top-2 popover !p-4'>
          <MenuList className='!flex !flex-col !gap-4 !font-bold'>
            {!user && (
              <>
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className='w-full text-center'
                >
                  Login
                </button>
                <Link to='/register' className='w-full text-center'>
                  Cadastro
                </Link>
              </>
            )}

            {user && (
              <>
                <Link to='/profile' className='w-full text-center'>
                  Perfil
                </Link>
                {user.admin && (
                  <>
                    <Link to='/dashboard' className='w-full text-center'>
                      Dashboard
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className='w-full text-center'>
                  Logout
                </button>
              </>
            )}

            <Link to='/faq' className='w-full text-center'>
              FAQ
            </Link>
          </MenuList>
        </MenuPopover>
      </Menu>

      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </header>
  );
}
