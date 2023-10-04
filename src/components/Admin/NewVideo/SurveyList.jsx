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

import { BiTrash } from 'react-icons/bi';

export default function SurveyList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteSurvey = () => {
    setVideoData((prev) => ({
      ...prev,
      survey: { ...prev.survey, survey: null },
    }));
  };

  console.log(videoData.survey.survey);
  return (
    <>
      <button
        type='button'
        onClick={onOpen}
        className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
      >
        Ver inclusas
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='!max-w-[95%]'>
          <ModalHeader className='!flex !items-center'>
            <Text className='text-primary-600 -mt-2'>Enquete</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={3}
            >
              {videoData.survey.survey && (
                <Box className='w-full flex items-center justify-between gap-4 mt-1'>
                  <Box>{videoData.survey.survey.question}</Box>
                  <Box className='flex items-center gap-2'>
                    <button onClick={handleDeleteSurvey}>
                      <BiTrash size={18} className='text-red-500' />
                    </button>
                  </Box>
                </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
