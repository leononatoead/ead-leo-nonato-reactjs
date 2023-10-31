import { useSelector } from "react-redux";
import useUserData from "../../../../hooks/useUserData";

import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
} from "@chakra-ui/react";

import { RiUserFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

export default function ChangeAdminState({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user: actualUser } = useSelector((state) => state.auth);

  const { changeAdminState } = useUserData();

  const handleChangeAdminState = () => {
    changeAdminState(user.id, !user.admin, actualUser);
  };

  return (
    <>
      <button onClick={onOpen}>
        {user?.admin ? (
          <Flex
            alignItems={"center"}
            gap={1}
            className="flex w-20 items-center justify-center rounded-full bg-green-200 text-white"
          >
            <MdAdminPanelSettings className="text-white" />
            <Text className="text-base font-normal">Admin</Text>
          </Flex>
        ) : (
          <Flex
            alignItems={"center"}
            gap={1}
            className="flex w-20 items-center justify-center rounded-full bg-gray-250  text-gray-700"
          >
            <RiUserFill className="text-gray-700" />
            <Text className="text-base font-normal">Aluno</Text>
          </Flex>
        )}
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="self-center !rounded-lg !bg-gray-200 lg:static"
          py={6}
        >
          <ModalHeader className="!flex !items-center !pb-0">
            <Text className="w-full text-center font-poppins text-large font-bold leading-6 text-primary-500">
              {user?.admin ? "Remover admin" : "Tornar usuário Admin"}
            </Text>
            <ModalCloseButton className="text-gray-800" />
          </ModalHeader>
          <ModalBody px={4} py={8} pb={0}>
            <button
              onClick={handleChangeAdminState}
              className="w-full rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
            >
              Alterar
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
