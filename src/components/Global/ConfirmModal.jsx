import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export default function ConfirmModal({ open, setOpen, deleteFunction }) {
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='!w-full !bg-red-500 !rounded-[4px] !px-3 !py-[5px] !text-white !text-base !leading-5 !h-auto'
      >
        Excluir
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader className='!text-large'>Confirmar exclusão</ModalHeader>
          <ModalBody>
            <Text>Esta ação não poderar ser desfeita, deseja continuar?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => setOpen(false)}
              className=' !bg-red-500 !rounded-[4px] !px-3 !py-[5px] !text-white !text-base !leading-5 !h-auto'
            >
              Cancelar
            </Button>
            <Button
              className='!bg-primary-500 !rounded-[4px] !px-3 !py-[5px] !text-white !text-base !leading-5 !h-auto'
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
