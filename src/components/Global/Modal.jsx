import { Dialog, DialogSurface } from '@fluentui/react-components';

import logo from '../../assets/auth-logo-black.svg';
import closeIcon from '../../assets/closeIcon.svg';

export default function Modal({
  openModal,
  handleCloseModal,
  title,
  children,
}) {
  return (
    <Dialog modalType='modal' open={openModal}>
      <DialogSurface className='!absolute !bottom-0 !rounded-tr-[24px] !rounded-tl-[24px] !rounded-bl-none  !rounded-br-none !outline-none !bg-[#efefef] !overflow-hidden'>
        <div className='relative flex justify-center w-full mb-6'>
          <p className='w-full text-center text-[#003E92] poppins text-[18px] font-bold'>
            {title}
          </p>

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
