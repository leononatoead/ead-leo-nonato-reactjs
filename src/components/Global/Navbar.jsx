import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/modules/auth/actions';
import LoginModal from '../Auth/LoginModal';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowLeftSLine } from 'react-icons/ri';
import {
  IoHelpSharp,
  IoLogOutOutline,
  IoLogInOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import { BiBook } from 'react-icons/bi';
import {
  MdOutlineNotificationsNone,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { BsPersonAdd } from 'react-icons/bs';
import { SiReacthookform } from 'react-icons/si';
import { FiUsers } from 'react-icons/fi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { PiTelevisionSimpleBold } from 'react-icons/pi';

export default function Navbar({ title }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleBackBtn = () => {
    const URL = path.pathname;

    const URLParamsArray = URL.split('/');

    let removeBlank = URLParamsArray.filter((value) => value !== '');

    removeBlank.pop();

    if (removeBlank.includes('edit')) {
      removeBlank.pop();
    }

    if (removeBlank.includes('course') && removeBlank.length === 1) {
      removeBlank.pop();
    }

    if (removeBlank.length > 0) {
      const newURL = removeBlank.join('/');
      const path = `/${newURL}`;
      navigate(path);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className='w-full px-4 py-1 bg-white font-bold flex gap-4 items-center justify-center'>
      {path.pathname !== '/' && (
        <button onClick={handleBackBtn} className='-ml-2'>
          <RiArrowLeftSLine size={25} />
        </button>
      )}
      {path.pathname === '/' ? (
        <Link
          to='/'
          className='block font-poppins text-large leading-6 flex-1 text-left font-bold poppins'
        >
          Leo Nonato
        </Link>
      ) : (
        <span className='block font-poppins text-[17px] leading-[22px] flex-1 text-center font-normal'>
          {title}
        </span>
      )}

      {path.pathname === '/' ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<GiHamburgerMenu />}
            variant='outline'
            className='!border-none !bg-transparent !outline-none !min-w-max'
          />
          <MenuList
            className='!flex !flex-col !justify-center !items-start !gap-[5px] !border-none !min-w-max !-translate-y-2 !shadow-lg'
            px={3}
            py={2}
          >
            {!user && (
              <>
                <MenuItem
                  className='!outline-none !border-none focus:!bg-white'
                  px={'6px'}
                  py={'3px'}
                  onClick={() => setOpenLoginModal(true)}
                >
                  <IoLogInOutline size={20} />
                  <span className='font-normal leading-[14px] ml-3'>Login</span>
                </MenuItem>
                <MenuItem
                  px={'6px'}
                  py={'3px'}
                  className='!outline-none !border-none focus:!bg-white'
                >
                  <BsPersonAdd size={20} />
                  <Link
                    to='/register'
                    className='font-normal leading-[14px] ml-3'
                  >
                    Cadastro
                  </Link>
                </MenuItem>
              </>
            )}

            {user && (
              <>
                {user.admin && (
                  <>
                    <MenuItem
                      px={'6px'}
                      py={'3px'}
                      className='!outline-none !border-none focus:!bg-white'
                    >
                      <MdOutlineSpaceDashboard size={20} />
                      <Link
                        to='/dashboard'
                        className='font-normal leading-[14px] ml-3'
                      >
                        Painel
                      </Link>
                    </MenuItem>
                  </>
                )}

                <MenuItem
                  px={'6px'}
                  py={'3px'}
                  className='!outline-none !border-none focus:!bg-white'
                >
                  <BiBook size={20} />
                  <Link
                    to='/my-courses'
                    className='font-normal leading-[14px] ml-3'
                  >
                    Meus Cursos
                  </Link>
                </MenuItem>

                <MenuItem
                  px={'6px'}
                  py={'3px'}
                  className='!outline-none !border-none focus:!bg-white'
                >
                  <IoPersonCircleOutline size={20} />
                  <Link
                    to='/profile'
                    className='font-normal leading-[14px] ml-3'
                  >
                    Perfil
                  </Link>
                </MenuItem>
              </>
            )}

            <MenuItem
              px={'6px'}
              py={'3px'}
              className='!outline-none !border-none focus:!bg-white'
            >
              <IoHelpSharp size={20} />
              <Link to='/faq' className='font-normal leading-[14px] ml-3'>
                FAQ
              </Link>
            </MenuItem>
            {user && (
              <MenuItem
                className='!outline-none !border-none focus:!bg-white'
                px={'6px'}
                py={'3px'}
                onClick={handleLogout}
              >
                <IoLogOutOutline size={20} />
                <span className='font-normal leading-[14px] ml-3'>Sair</span>
              </MenuItem>
            )}
          </MenuList>

          <LoginModal
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
          />
        </Menu>
      ) : (
        path.pathname.includes('dashboard') && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<GiHamburgerMenu />}
              variant='outline'
              className='!border-none !bg-transparent !outline-none !min-w-max'
            />
            <MenuList
              className='!flex !flex-col !justify-center !items-start !gap-[5px] !border-none !min-w-max !-translate-y-2 !shadow-lg'
              px={3}
              py={2}
            >
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <PiTelevisionSimpleBold size={20} />
                <Link
                  to='/dashboard/courses'
                  className='font-normal leading-[14px] ml-3'
                >
                  Cursos
                </Link>
              </MenuItem>
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <AiOutlinePaperClip size={20} />
                <Link
                  to='/dashboard/posts'
                  className='font-normal leading-[14px] ml-3'
                >
                  Newsletter
                </Link>
              </MenuItem>
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <MdOutlineNotificationsNone size={20} />
                <Link
                  to='/dashboard/notifications'
                  className='font-normal leading-[14px] ml-3'
                >
                  Anúncios
                </Link>
              </MenuItem>
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <SiReacthookform size={20} />
                <Link
                  to='/dashboard/forms'
                  className='font-normal leading-[14px] ml-3'
                >
                  Formulários
                </Link>
              </MenuItem>
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <FiUsers size={20} />
                <Link
                  to='/dashboard/students'
                  className='font-normal leading-[14px] ml-3'
                >
                  Usuários
                </Link>
              </MenuItem>
              <MenuItem
                px={'6px'}
                py={'3px'}
                className='!outline-none !border-none focus:!bg-white'
              >
                <IoHelpSharp size={20} />

                <Link
                  to='/dashboard/faq'
                  className='font-normal leading-[14px] ml-3'
                >
                  FAQ
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        )
      )}
    </header>
  );
}
