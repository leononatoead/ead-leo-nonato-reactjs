import { Dialog, DialogSurface } from '@fluentui/react-components';

import logo from '../../assets/auth-logo-black.svg';
import closeIcon from '../../assets/closeIcon.svg';

export default function Modal({ openModal, setOpenModal, children }) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Dialog modalType='modal' open={openModal}>
      <DialogSurface className='!absolute !bottom-0 !rounded-tr-[24px] !rounded-tl-[24px] !rounded-bl-none  !rounded-br-none !outline-none !bg-[#efefef] !overflow-hidden'>
        <div className='relative flex justify-center w-full mb-11'>
          <img src={logo} alt='logo' />
          <button
            onClick={handleCloseModal}
            className='border-none bg-transparent absolute right-0 outline-none'
          >
            <img src={closeIcon} alt='close' className='w-4' />
          </button>
        </div>
        <>{children}</>
      </DialogSurface>
    </Dialog>
  );
}
