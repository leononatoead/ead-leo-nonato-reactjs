import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

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
} from '@chakra-ui/react';
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoTwitter,
  BiLogoWhatsapp,
  BiShare,
} from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';

export default function ShareBtn({ url }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        <BiShare />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='!flex !items-center'>
            <Text className='text-primary-600 -mt-2'>Compartilhar</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
              <EmailShareButton url={url} className='bg-gray-200'>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <MdOutlineEmail className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </EmailShareButton>
              <FacebookShareButton url={url}>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <BiLogoFacebook className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </FacebookShareButton>
              <LinkedinShareButton url={url}>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <BiLogoLinkedin className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </LinkedinShareButton>
              <TelegramShareButton url={url}>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <BiLogoTelegram className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </TelegramShareButton>
              <TwitterShareButton url={url}>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <BiLogoTwitter className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </TwitterShareButton>

              <WhatsappShareButton url={url}>
                <Box className='bg-gray-200 p-3 rounded-full flex items-center justify-center'>
                  <BiLogoWhatsapp className='text-primary-400 w-6 md:w-9  h-6 md:h-9 ' />
                </Box>
              </WhatsappShareButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
