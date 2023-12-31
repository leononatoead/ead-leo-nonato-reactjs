import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function NotificationModal({ notification, updater }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [read, setRead] = useState(false);

  useEffect(() => {
    const storageNotifications = JSON.parse(
      localStorage.getItem("readNotifications"),
    );

    if (isOpen) {
      let data;

      if (storageNotifications) {
        const verifyIfAlreadyIncluded = storageNotifications.find(
          (ntf) => ntf === notification.id,
        );

        if (verifyIfAlreadyIncluded) {
          return;
        } else {
          data = [...storageNotifications, notification.id];
        }
      } else {
        data = [notification.id];
      }

      localStorage.setItem("readNotifications", JSON.stringify(data));
      updater((prev) => !prev);
    }

    if (storageNotifications) {
      const verify = storageNotifications.find(
        (ntf) => ntf === notification.id,
      );
      if (verify) {
        setRead(true);
      } else {
        setRead(false);
      }
    }
  }, [isOpen]);

  return (
    <>
      <Box
        onClick={onOpen}
        className="flex w-full !min-w-[275px] !max-w-[275px] items-center gap-2 rounded-md !bg-gray-200 px-2 transition-all hover:!bg-gray-150 lg:p-3"
      >
        <Box className="flex w-7 items-center justify-center">
          {read ? (
            <PiEye size={20} className="text-gray-800" />
          ) : (
            <PiEyeSlash size={20} className="text-primary-400" />
          )}
        </Box>
        <Box className="flex w-full flex-1 flex-col items-start justify-center">
          <Text className="w-full text-start text-base">
            {notification.title}
          </Text>
          <Text className="!max-w-[184px] !truncate text-start text-small font-normal leading-4 text-gray-800">
            {notification.subtitle}
          </Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!w-[90%] !max-w-[600px]">
          <ModalHeader p={6}>
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
            <pre className="mb-4 whitespace-pre-line text-justify text-base">
              {notification?.text}
            </pre>
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
