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
  Image,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

export default function AdvertisementList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAdvertisement = (index) => {
    const filter = videoData.advertisement.advertisementList.filter(
      (asset, i) => i !== index,
    );

    setVideoData((prev) => ({
      ...prev,
      advertisement: { ...prev.advertisement, advertisementList: filter },
    }));
  };

  return (
    <>
      <button
        type='button'
        onClick={onOpen}
        className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
      >
        Ver inclusos
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='!max-w-[95%]'>
          <ModalHeader className='!flex !items-center'>
            <Text className='text-primary-600 -mt-2'>Anúncios</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={3}
            >
              {videoData.advertisement.advertisementList.length > 0 ? (
                videoData.advertisement.advertisementList.map(
                  (advertisement, index) => (
                    <Box key={index} className='w-full'>
                      <Image
                        src={advertisement.advertisementImage}
                        className='max-h-[60px] w-full object-cover rounded-md'
                      />
                      <Box className='w-full flex items-center justify-between gap-4 mt-1'>
                        <Box>{advertisement.advertisementName}</Box>
                        <Box className='flex items-center gap-2'>
                          <button
                            onClick={() => handleDeleteAdvertisement(index)}
                          >
                            <BiTrash size={18} className='text-red-500' />
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  ),
                )
              ) : (
                <Text className='p-2'>Nenhum anúncio cadastrado.</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
