import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoTwitter,
  BiLogoWhatsapp,
  BiShare,
  BiShareAlt,
} from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";

export default function ShareBtn({ url }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <button onClick={onOpen}>
        <BiShareAlt
          size={isLargerThanLg ? 24 : 18}
          className="text-primary-600"
        />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader className="!flex !items-center">
            <Text className="-mt-2 text-primary-600">Compartilhar</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <EmailShareButton url={url} className="bg-gray-200">
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <MdOutlineEmail className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </EmailShareButton>
              <FacebookShareButton url={url}>
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <BiLogoFacebook className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </FacebookShareButton>
              <LinkedinShareButton url={url}>
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <BiLogoLinkedin className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </LinkedinShareButton>
              <TelegramShareButton url={url}>
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <BiLogoTelegram className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </TelegramShareButton>
              <TwitterShareButton url={url}>
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <BiLogoTwitter className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </TwitterShareButton>

              <WhatsappShareButton url={url}>
                <Box className="flex items-center justify-center rounded-full bg-gray-200 p-3">
                  <BiLogoWhatsapp className="h-6 w-6 text-primary-400  md:h-9 md:w-9 " />
                </Box>
              </WhatsappShareButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
