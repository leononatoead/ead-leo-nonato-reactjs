import { useState } from 'react';

import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import ModalComponent from '../../Global/ModalComponent';

export default function LoginModal({ openLoginModal, setOpenLoginModal }) {
  const [showResetPass, setShowResetPass] = useState(false);

  const handleCloseModal = () => {
    setShowResetPass(false);
    setOpenLoginModal(false);
  };

  return (
    <ModalComponent
      header={true}
      openModal={openLoginModal}
      setOpenModal={setOpenLoginModal}
      handleCloseModal={handleCloseModal}
    >
      {showResetPass ? (
        <ResetPasswordForm show={setShowResetPass} />
      ) : (
        <LoginForm show={setShowResetPass} />
      )}
    </ModalComponent>
  );
}
