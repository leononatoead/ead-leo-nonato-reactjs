import useAuth from "../hooks/useAuth";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { logoutUser } from "../redux/modules/auth/actions";
import { useDispatch } from "react-redux";

export default function DeleteModal() {
  const { delUser } = useAuth();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Modal isOpen={true}>
        <ModalOverlay />
        <ModalContent className="!absolute !bottom-0 !m-0 !min-w-full !rounded-b-none !rounded-t-3xl !bg-gray-200 md:!static md:!min-w-[450px] md:!max-w-[450px] md:!self-center md:!rounded-2xl md:px-6">
          <ModalHeader>Desativação de conta</ModalHeader>

          <ModalBody>
            Por decisão de nossos administradores, sua conta será desativada. Se
            não concordar, entre em contato com a nossa equipe de suporte.
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              className="mr-4 !bg-primary-500 !text-white !outline-none focus:!outline-none"
              onClick={handleLogout}
            >
              Sair
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              className="!outline-none focus:!outline-none"
              onClick={delUser}
            >
              Estou de acordo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
