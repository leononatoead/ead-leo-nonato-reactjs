import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/modules/auth/actions';
import LoginModal from '../Auth/LoginModal';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowLeftSLine } from 'react-icons/ri';

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
    <header className='w-full px-4 py-1 bg-white font-bold flex gap-4 items-center justify-center'>
      {path.pathname !== '/' && (
        <Link to={-1}>
          <RiArrowLeftSLine size={30} />
        </Link>
      )}
      {path.pathname === '/' ? (
        <Link
          to='/'
          className='block font-poppins text-large leading-6 flex-1 text-left font-bold poppins'
        >
          Léo Nonato
        </Link>
      ) : (
        <span className='block font-poppins text-[17px] leading-[22px] flex-1 text-center font-normal'>
          {title}
        </span>
      )}

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<GiHamburgerMenu />}
          variant='outline'
          className='!border-none !bg-transparent'
        />
        <MenuList>
          {!user && (
            <>
              <MenuItem onClick={() => setOpenLoginModal(true)}>
                <span className='!w-full !text-center'>Login</span>
              </MenuItem>
              <MenuItem>
                <Link to='/register' className='w-full text-center'>
                  Cadastro
                </Link>
              </MenuItem>
            </>
          )}

          {user && (
            <>
              <MenuItem>
                <Link to='/profile' className='w-full text-center'>
                  Perfil
                </Link>
              </MenuItem>
              {user.admin && (
                <>
                  <MenuItem>
                    <Link to='/dashboard' className='w-full text-center'>
                      Dashboard
                    </Link>
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={handleLogout}>
                <span className='w-full text-center'>Sair</span>
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Link to='/faq' className='w-full text-center'>
              FAQ
            </Link>
          </MenuItem>
        </MenuList>

        <LoginModal
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      </Menu>
    </header>
  );
}
