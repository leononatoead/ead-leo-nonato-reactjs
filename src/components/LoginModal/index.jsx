import {
  Button,
  Dialog,
  DialogSurface,
  DialogTrigger,
} from '@fluentui/react-components';

import logo from '../../assets/auth-logo-black.svg';
import closeIcon from '../../assets/closeIcon.svg';
import LoginForm from './LoginForm';

export default function LoginModal({ openLoginModal, setOpenLoginModal }) {
  return (
    <Dialog modalType='modal' open={openLoginModal}>
      <DialogSurface className='!absolute !bottom-0 !rounded-tr-[24px] !rounded-tl-[24px] !rounded-bl-none  !rounded-br-none !outline-none !bg-[#efefef] !overflow-hidden'>
        <div className='relative flex justify-center w-full mb-11'>
          <img src={logo} alt='logo' />
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance='secondary'
              onClick={() => setOpenLoginModal(false)}
              className='!border-none !bg-transparent !absolute !-right-10'
            >
              <img src={closeIcon} alt='close' className='bg-transparent w-4' />
            </Button>
          </DialogTrigger>
        </div>
        <LoginForm />
      </DialogSurface>
    </Dialog>
  );
}
