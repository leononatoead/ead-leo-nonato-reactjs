import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/modules/auth/actions';
import LoginModal from '../Auth/LoginModal';

import arrowLeft from '../../assets/left-arrow.svg';
import burger from '../../assets/burger.svg';
import {
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

export default function DashboardNavbar() {
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const path = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate('/');
  // };

  return (
    <header className='w-full px-4 py-2 bg-white font-bold flex gap-4 items-center justify-center'>
      <Menu className='!h-[44px]'>
        <div className='flex items-center justify-center w-full'>
          {path.pathname !== '/dashboard' ? (
            <Link to='/dashboard'>
              <img src={arrowLeft} alt='back' />
            </Link>
          ) : (
            <Link to='/'>
              <img src={arrowLeft} alt='back' />
            </Link>
          )}

          <span className='block poppins text-[17px] leading-[22px] flex-1 text-center font-normal'>
            Dashboard
          </span>
          <MenuTrigger disableButtonEnhancement>
            <button className=''>
              <img src={burger} alt='menu' />
            </button>
          </MenuTrigger>
        </div>

        <MenuPopover className='!p-4'>
          <MenuList className='!flex !flex-col !gap-4 !font-bold'>
            <Link to='/dashboard/courses' className='w-full text-center'>
              Cursos
            </Link>
            <Link to='/dashboard/forms' className='w-full text-center'>
              Questionários
            </Link>
            <Link to='/dashboard/faq' className='w-full text-center'>
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
