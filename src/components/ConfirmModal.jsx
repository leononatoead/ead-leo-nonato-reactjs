import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export default function ConfirmModal({
  open,
  setOpen,
  deleteFunction,
  text,
  button,
}) {
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="!h-auto !w-full !rounded-[4px] !bg-red-500 !px-3 !py-[5px] !text-base !leading-5 !text-white"
      >
        {button ? button : "Excluir"}
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent className="!absolute !bottom-0 !m-0 !min-w-full !rounded-b-none !rounded-t-3xl !bg-gray-200 md:!static md:!min-w-[450px] md:!max-w-[450px] md:!self-center md:!rounded-2xl md:px-6">
          <ModalHeader className="!text-large">Confirmar exclusão</ModalHeader>
          <ModalBody>
            <Text>
              {text
                ? text
                : "Esta ação não poderar ser desfeita, deseja continuar?"}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => setOpen(false)}
              className=" !h-auto !rounded-[4px] !bg-red-500 !px-3 !py-[5px] !text-base !leading-5 !text-white"
            >
              Cancelar
            </Button>
            <Button
              className="!h-auto !rounded-[4px] !bg-primary-500 !px-3 !py-[5px] !text-base !leading-5 !text-white"
              onClick={deleteFunction}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
