import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";

export default function ConfirmModal({ deleteFunction, name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className="!h-auto !bg-white !px-3 !py-[5px] ">
        <BiTrash size={18} className="text-red-500" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader className="!text-large">Confirmar exclusão</ModalHeader>
          <ModalBody>
            <Text>
              Caso este módulo tenha aulas adicionadas{" "}
              <span className="font-bold text-red-500">
                todas as aulas serão excluídas
              </span>{" "}
              e esta ação{" "}
              <span className="font-bold text-red-500">
                não poderar ser desfeita
              </span>
              , deseja continuar?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              className=" !h-auto !rounded-[4px] !bg-red-500 !px-3 !py-[5px] !text-base !leading-5 !text-white"
            >
              Cancelar
            </Button>
            <Button
              className="!h-auto !rounded-[4px] !bg-primary-500 !px-3 !py-[5px] !text-base !leading-5 !text-white"
              onClick={() => {
                deleteFunction(name);
              }}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
