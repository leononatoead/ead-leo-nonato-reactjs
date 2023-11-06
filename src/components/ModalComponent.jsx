import {
  Modal,
  ModalContent,
  ModalOverlay,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import logo from "../assets/auth-logo-black.svg";

export default function ModalComponent({
  openModal,
  handleCloseModal,
  title,
  children,
  header = null,
  hasCloseButton = true,
}) {
  return (
    <Modal isOpen={openModal} my={0}>
      <ModalOverlay />
      <ModalContent
        className="!absolute !bottom-0 !m-0 !min-w-full !rounded-b-none !rounded-t-3xl !bg-gray-200 md:!static md:!min-w-[450px] md:!max-w-[450px] md:!self-center md:!rounded-2xl md:px-6"
        py={6}
      >
        {header ? (
          <Box className="relative mb-11 flex w-full justify-center">
            <Image src={logo} alt="logo" />
            {hasCloseButton && (
              <button
                onClick={handleCloseModal}
                className="absolute right-4 border-none bg-transparent outline-none"
              >
                <RiCloseFill size={20} />
              </button>
            )}
          </Box>
        ) : (
          <Box className="relative mb-7 flex w-full justify-center">
            <Text className="w-full text-center text-large font-bold text-primary-500">
              {title}
            </Text>
            {hasCloseButton && (
              <button
                onClick={handleCloseModal}
                className="absolute right-4 border-none bg-transparent outline-none"
              >
                <RiCloseFill alt="close" size={20} />
              </button>
            )}
          </Box>
        )}
        <>{children}</>
      </ModalContent>
    </Modal>
  );
}
