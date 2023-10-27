import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function NotificationModal({ notification }) {
  console.log(notification);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        onClick={onOpen}
        className="flex w-full !min-w-[275px] !max-w-[275px] items-center gap-2 rounded-md !bg-gray-200 px-2 transition-all hover:!bg-gray-150"
      >
        <Box className="flex w-7 items-center justify-center">
          <PiEye size={20} />
          {/* <PiEyeSlash size={20} /> */}
        </Box>
        <Box className="flex w-full flex-1 flex-col items-start justify-center">
          <Text className="w-full text-start text-base">
            {notification.title}
          </Text>
          <Text className="!max-w-[184px] !truncate text-start text-small font-normal leading-4">
            {notification.subtitle}
          </Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!w-[90%] !max-w-[600px]">
          <ModalHeader>
            <Box className="!flex !items-start">
              <Text className="-mt-2 font-poppins font-bold text-primary-500">
                {notification?.title}
              </Text>
              <ModalCloseButton />
            </Box>
            <Text className="text-base font-normal italic">
              {notification?.subtitle}
            </Text>
          </ModalHeader>
          <ModalBody p={4}>
            {notification?.imageURL && (
              <img
                src={notification?.imageURL}
                alt="ad"
                className="mb-4 max-h-[500px] w-full rounded-md object-contain"
              />
            )}
            <Text className="mb-4 text-justify text-base">
              {notification?.text}
            </Text>
            {notification?.url && (
              <Link
                to={notification?.url}
                className="rounded-[4px] bg-primary-400 px-3
                  py-[5px] text-base leading-5 text-white"
              >
                Visualizar
              </Link>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
